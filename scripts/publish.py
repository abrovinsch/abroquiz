import os
from git import Repo


def push(repo, remote_name):
    origin = repo.remotes[remote_name]
    if not origin.exists():
        print(
            "--- Remote '{}' does not exist! 🦑".format(remote_name))
        exit()

    print("--- Pushing to {} 🐳".format(remote_name))
    origin.push()


def publish():

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
    push(repo, "origin")

    # Tell host to rebuild


if __name__ == "__main__":
    publish()
