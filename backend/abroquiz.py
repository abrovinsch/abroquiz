import json
import sqlite3
import os
import sys
import yaml
from flask import g, Response


def load_settings():
    with open("settings.yml") as file:
        return yaml.safe_load(file)


DATABASE = load_settings()['db_file']


def create_connection(db_file):
    print(os.getcwd())

    if not os.path.isfile(db_file):
        print("No such DB!", db_file)

    conn = None
    try:
        conn = sqlite3.connect(db_file)
        conn.row_factory = dict_factory
    except:
        print(sys.exc_info()[0])
    return conn


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = create_connection(DATABASE)
    return db


def close_connection():
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    records = cur.fetchall()
    cur.close()

    return (records[0] if records else True) if one else records


def write_db(query, args=()):
    try:
        cur = get_db().execute(query, args)
        cur.close()
        submit_db()
        return "true"
    except:
        print(sys.exc_info()[0])
        return "false"


def submit_db():
    get_db().commit()


def teardown(exception):
    close_connection()


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def json_response(obj):
    return Response(
        response=json.dumps(obj),
        status=200,
        mimetype='application/json'
    )


# END_POINTS

def get_questions(quiz_id):
    return json_response(query_db("""
        SELECT * FROM questions WHERE
        quiz_id = "{}"
    """.format(quiz_id)))


def submit_question(question, answer, quiz_id, question_type):
    return write_db("""
        INSERT INTO questions (
            "question_text",
        	"answer_text",
        	"quiz_id",
            "question_type"
            )
        VALUES (
        	"{q}",
        	"{a}",
        	"{i}",
        	"{t}");
    """.format(q=question, a=answer, i=quiz_id, t=question_type))
