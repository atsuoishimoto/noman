from textwrap import indent
from typing import Any, Dict, Iterable, cast
from contextlib import contextmanager
from mistune.core import BaseRenderer, BlockState
from mistune.util import strip_end
from pygments.formatters import terminal
from pygments.lexers import get_lexer_by_name
from pygments import highlight
from . import colors


def _render_list_item(
    renderer: "BaseRenderer",
    parent: Dict[str, Any],
    item: Dict[str, Any],
    state: "BlockState",
) -> str:
    leading = cast(str, parent["leading"])
    text = ""
    for tok in item["children"]:
        if tok["type"] == "list":
            tok["parent"] = parent
        elif tok["type"] == "blank_line":
            continue
        text += renderer.render_token(tok, state)

    lines = text.splitlines()
    text = (lines[0] if lines else "") + "\n"
    prefix = " " * len(leading)
    for line in lines[1:]:
        if line:
            text += prefix + line + "\n"
        else:
            text += "\n"
    return leading + text


def _render_ordered_list(
    renderer: "BaseRenderer", token: Dict[str, Any], state: "BlockState"
) -> Iterable[str]:
    attrs = token["attrs"]
    start = attrs.get("start", 1)
    for item in token["children"]:
        leading = str(start) + token["bullet"] + " "
        parent = {
            "leading": leading,
            "tight": token["tight"],
        }
        yield _render_list_item(renderer, parent, item, state)
        start += 1


def _render_unordered_list(
    renderer: "BaseRenderer", token: Dict[str, Any], state: "BlockState"
) -> Iterable[str]:
    parent = {
        "leading": token["bullet"] + " ",
        "tight": token["tight"],
    }
    for item in token["children"]:
        yield _render_list_item(renderer, parent, item, state)


def render_list(
    renderer: "BaseRenderer", token: Dict[str, Any], state: "BlockState"
) -> str:
    attrs = token["attrs"]
    if attrs["ordered"]:
        children = _render_ordered_list(renderer, token, state)
    else:
        children = _render_unordered_list(renderer, token, state)

    text = "".join(children)
    parent = token.get("parent")
    if parent:
        if parent["tight"]:
            return text
        return text + "\n"
    return strip_end(text) + "\n\n"


class StyleManager:
    def __init__(self, theme):
        self._theme = theme
        self._fg = colors.fg.default
        self._bg = colors.bg.default
        self._attrs = set()
        self._lv = 1

    @contextmanager
    def _with_style(self, style):
        self._lv += 1
        fg = None
        bg = None
        attrs = {}

        if style.fg and (style.fg is not self._fg):
            fg = style.fg

        if style.bg and (style.bg is not self._bg):
            bg = style.bg

        attrs = style.attrs - self._attrs
        s = []
        e = []
        if attrs:
            s = [*attrs]
            if fg:
                s.append(fg)
            if bg:
                s.append(bg)
            e = [colors.attr.reset, *self._attrs]
            if self._fg != colors.fg.default:
                e.append(self._fg)
            if self._bg != colors.bg.default:
                e.append(self._bg)
        else:
            if fg:
                s.append(fg)
                e.append(self._fg)
            if bg:
                s.append(bg)
                e.append(self._bg)

        save_fg = self._fg
        save_bg = self._bg
        save_attrs = self._attrs.copy()
        if fg:
            self._fg = fg
        if bg:
            self._bg = bg
        self._attrs = self._attrs | attrs

        yield ("".join(s), "".join(e))

        self._fg = save_fg
        self._bg = save_bg
        self._attrs = save_attrs.copy()
        self._lv -= 1

    def with_style(self, name):
        style = getattr(self._theme, name)
        return self._with_style(style)


def dump(tokens, indent=0):
    for token in tokens:
        ttt = {k: v for (k, v) in token.items() if k not in {"children", "raw", "type"}}

        print("  " * indent + token["type"], repr(token.get("raw", "")[:20]), ttt)

        children = token.get("children", [])
        if children:
            dump(children, indent=indent + 2)


class ANSIRenderer(BaseRenderer):
    """A renderer for converting Markdown to ANSI colered text."""

    THEME = colors.Dark

    def __init__(self):
        super().__init__()
        self.theme = StyleManager(self.THEME)
        self._nested = 0

    def style(self, name):
        return self.theme.with_style(name)

    def __call__(self, tokens: Iterable[Dict[str, Any]], state: BlockState) -> str:
        out = self.render_tokens(tokens, state)
        assert self._nested == 0
        return strip_end(out)

    def margin(self, s):
        if self._nested == 1:
            return indent(s, "    ")
        return s

    def render_token(self, token: Dict[str, Any], state: BlockState) -> str:
        # pprint.pprint(token)
        self._nested += 1
        try:
            return super().render_token(token, state)
        finally:
            self._nested -= 1

    def render_children(self, token: Dict[str, Any], state: BlockState) -> str:
        children = token["children"]
        return self.render_tokens(children, state)

    def blank_line(self, token, state):
        return "\n"

    def text(self, token: Dict[str, Any], state: BlockState) -> str:
        with self.style("text") as (s, e):
            return f"{s}{token['raw']}{e}"

    def emphasis(self, token: Dict[str, Any], state: BlockState) -> str:
        with self.style("emphasis") as (s, e):
            text = self.render_children(token, state)
            return f"{s}{text}{e}"

    def strong(self, token: Dict[str, Any], state: BlockState) -> str:
        text = self.render_children(token, state)
        with self.style("strong") as (s, e):
            return f"{s}{text}{e}"

    def link(self, token: Dict[str, Any], state: BlockState) -> str:
        attrs = token["attrs"]
        url = attrs["url"]
        with self.style("link") as (s, e):
            text = self.render_children(token, state)
            return f"{s}{text}({url}){e}"

    def image(self, token: Dict[str, Any], state: BlockState) -> str:
        return "{Images are not supported}"

    def codespan(self, token: Dict[str, Any], state: BlockState) -> str:
        with self.style("code") as (s, e):
            return f"{s}{token['raw']}{e}"

    def linebreak(self, token: Dict[str, Any], state: BlockState) -> str:
        return "\n"

    def softbreak(self, token: Dict[str, Any], state: BlockState) -> str:
        return " "

    def inline_html(self, token: Dict[str, Any], state: BlockState) -> str:
        return "<html is not supported>"

    def paragraph(self, token: Dict[str, Any], state: BlockState) -> str:
        return self.margin(self.render_children(token, state) + "\n")

    def heading(self, token: Dict[str, Any], state: BlockState) -> str:
        level = min(token["attrs"]["level"], 4)
        stylename = f"h{level}"

        with self.theme.with_style(stylename) as (s, e):
            text = self.render_children(token, state)
            text = s + text + e + "\n"
            if level >= 4:
                text = self.margin(text)
            return text

    def thematic_break(self, token: Dict[str, Any], state: BlockState) -> str:
        return self.margin("--------------\n\n")

    def block_text(self, token: Dict[str, Any], state: BlockState) -> str:
        return self.render_children(token, state) + "\n"

    def block_code(self, token: Dict[str, Any], state: BlockState) -> str:
        code = token["raw"]
        attrs = token.get("attrs", {})
        info = attrs.get("info")
        if info:
            lexer = get_lexer_by_name(info, stripall=True)
            formatter = terminal.TerminalFormatter(bg="dark")
            code = highlight(code, lexer, formatter)
        else:
            with self.style("blockcode") as (s, e):
                code = s + token["raw"] + e

        return self.margin(code)

    def block_quote(self, token: Dict[str, Any], state: BlockState) -> str:
        with self.style("quote") as (s, e):
            text = self.render_children(token, state)
            text = indent(text.strip(), "   ")
            return self.margin(f"{s}{text}{e}")

    def block_html(self, token: Dict[str, Any], state: BlockState) -> str:
        return self.margin("<html is not supported>")

    def block_error(self, token: Dict[str, Any], state: BlockState) -> str:
        return ""

    def list(self, token: Dict[str, Any], state: BlockState) -> str:
        return self.margin(render_list(self, token, state))
