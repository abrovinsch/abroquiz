"""
Utility module for interacting with the database
Note: only for service use
"""

import sqlite3
import os
import sys
import yaml


def load_settings():
    with open("settings.yml") as file:
        return yaml.safe_load(file)


def create_db_if_not_exist():
    path = load_settings()["db_file"]
    if not os.path.isfile(path):
        print("Creating DB {}".format(path))
        conn = None
        try:
            conn = sqlite3.connect(path)
        except:
            error = sys.exc_info()[0]
            print(error)
        finally:
            if conn:
                conn.close()


def create_connection(db_file):

    if not os.path.isfile(db_file):
        print("No such DB!", db_file)
        exit()

    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except:
        error = sys.exc_info()[0]
        print(error)

    return conn


def run_query(query, as_script=False):
    sqlite_connection = False

    try:
        sqlite_connection = create_connection(load_settings()["db_file"])
        cursor = sqlite_connection.cursor()

        try:
            print("Running >", query)
            if as_script:
                cursor.executescript(query)
            else:
                cursor.execute(query)
        except Exception as e:
            print("--- Could not run query: {}".format(e))

        cursor.close()
        sqlite_connection.commit()

    except sqlite3.Error as error:
        print("Error: ", error)
        exit()
    finally:
        if (sqlite_connection):
            sqlite_connection.close()
            print("The SQLite connection is closed")


def run_sql_file(filepath):
    loaded_query = ""
    with open(filepath) as file:
        loaded_query = file.read()

    run_query(loaded_query, as_script=True)
