import json
import sqlite3
import os
from flask import g

DATABASE = 'db/abroquiz_1.db'

def create_connection(db_file):
    print(os.getcwd())

    if not os.path.isfile(db_file):
        print("No such DB!", db_file)

    conn = None
    try:
        conn = sqlite3.connect(db_file)
        conn.row_factory = dict_factory
    except Error as e:
        print(e)
    return conn

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = create_connection(DATABASE)
    return db

def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    records = cur.fetchall()
    cur.close()

    return (rv[0] if records else None) if one else records

def teardown(exception):
    close_connection(exception)

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_questions(quiz_id, topic):
    return json.dumps(query_db("""
        SELECT * FROM question;
    """))
