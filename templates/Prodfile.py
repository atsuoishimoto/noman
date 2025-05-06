

@task
def extract():
    run("pybabel extract -F mapping.cfg . -o locale/messages.pot -w 100")


@task
def init_locale():
    run("pybabel init -l ja_JP -i locale/messages.pot -d locale")

@task
def update():
    run("pybabel update -i locale/messages.pot -d locale -w 100")

@task
def compile():
    run("pybabel compile -d locale")
