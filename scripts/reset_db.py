import dbutil

if __name__ == '__main__':
    dbutil.create_db_if_not_exist()
    dbutil.run_sql_file("scripts/reset_tables.sql")
