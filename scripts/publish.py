import os
from git import Repo
import yaml
import webbrowser


def push(repo, remote_name):
    origin = repo.remotes[remote_name]
    if not origin.exists():
        print(
            "--- Remote '{}' does not exist! 🦑".format(remote_name))
        exit()

    print("--- Pushing to {} 🐳".format(remote_name))
    origin.push()


def load_settings():
    with open("settings.yml") as file:
        return yaml.safe_load(file)


def publish():

    # Load settings
    settings = load_settings()

    # Check for un-commited changes
    repo = Repo(os.getcwd())
    if repo.is_dirty():
        print('--- Commit your changes first 🦑')
        exit()

    # Run tests
    r = os.system("python3 -m unittest discover")
    if r != 0:
        print("--- Tests failed! 🦑")
        exit()

    # Git Push
    push(repo, settings['remote_name'])

    # Open dashboard
    webbrowser.open(settings['dashboard_url'])

    print("--- Done 🐚")


if __name__ == "__main__":
    publish()
