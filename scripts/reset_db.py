import sqlite3
import os

def create_connection(db_file):

    if not os.path.isfile(db_file):
        print("No such DB!", db_file)
        exit()

    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)


    return conn

def reset_db():
    sqliteConnection = False

    try:
        my_db = input('db_name: ')


        sqliteConnection = create_connection('%s.db' % my_db)

        cursor = sqliteConnection.cursor()
        tables = ["question"]

        for table in tables:
            query = """
                DELETE FROM {};
            """.format(table)
            print(query)
            cursor.execute(query)

        cursor.close()

    except sqlite3.Error as error:
        print("Error: ", error)
        exit()
    finally:
        if (sqliteConnection):
            sqliteConnection.close()
            print("The SQLite connection is closed")


if __name__ == '__main__':
    reset_db()
