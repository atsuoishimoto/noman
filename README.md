# noman – AI-powered, human-friendly man pages

**Noman** is a command-line tool and website that offers simplified, AI-generated documentation for Unix commands.  
Traditional `man` pages are thorough but often hard to digest. **Noman** uses AI to summarize and clarify command usage, making it easier to understand. No man behind these man pages.

---

## 🚀 Features

### AI-Generated, Pre-Generated  
Pages are generated using carefully designed AI prompts, then saved as static files—making them load instantly like regular man pages.

### Focused on Practical Usage  
Noman highlights the most common and useful command options, omitting obscure flags and overly technical details irrelevant to daily tasks.

### Simplified Language  
All documentation is written in clear, plain Language. No jargon or dense syntax—just what you need, explained simply.

### Real-World Examples  
Each command includes real-world use cases that reflect how developers and sysadmins actually use these tools.

### FAQs and Pitfalls  
Frequently asked questions and common mistakes are addressed directly on each command page, saving users from trial-and-error.

### Clean CLI Output with Markdown Formatting and Colors  
Command-line output is structured with lightweight Markdown and ANSI colors, improving readability in the terminal.  
Headings, code blocks, and options are visually distinct and easy to scan.

### Instant Results – No Waiting, No Typing Questions  
Unlike AI chat tools or online searches, Noman doesn't require phrasing a question or waiting for a response.  
Just type `noman ls` and get a clean, helpful answer instantly.

---

## 💡 Why AI Works Well Here

It is widely recognized that AI-generated technical explanations often fall short in terms of clarity and accuracy. However, in the case of Unix commands—a well-established and thoroughly documented domain—AI systems have a distinct advantage: they can reference authoritative sources to produce reliable content with minimal risk of error.

---

## 🔒 Safer Than Searching

General-purpose AIs and web search often return inconsistent, outdated, or poorly structured results depending on query phrasing.  
Noman avoids that by pre-generating all pages with verified prompts and consistent formatting.  
It's a safer, faster, and more beginner-friendly way to learn command-line tools.

## Low maintenance cost

Noman requires virtually no human intervention. Since pages are AI-generated, there's no need for manual updates or editorial work—the only cost is the AI API fee! This approach makes it incredibly easy to expand documentation by simply adding new commands or refining prompts, resulting in immediate quality improvements without the traditional overhead of documentation maintenance.

---

## 🛠 Installation

We recommend using uv to install Noman.

1. Install uv (if not already installed):

   ```console
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
2. Install Noman using uv:

   ```console
   uv tool install noman
   ```

## License

MIT License

## Disclaimer

Whether written by human or conjured by machine learning, any document may contain errors or omissions. This content is provided “as is” with no warranties of any kind, either express or implied. Users must independently verify the accuracy and applicability of all content, especially before use in production environments.
