import MySQLdb


def initialize():
    connection = MySQLdb.connect(
        host="localhost",
        user="root",
        passwd="root",
        db="python_db"
    )
    cursor = connection.cursor()

    cursor.execute("DROP TABLE IF EXISTS user_info")
    cursor.execute("DROP TABLE IF EXISTS game_hist")

    cursor.execute("""CREATE TABLE user_info(
        user_id INT(11) AUTO_INCREMENT NOT NULL,
        name VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        rating INT(6) NOT NULL,
        PRIMARY KEY (user_id)
    )""")
    cursor.execute("""INSERT INTO user_info (name, rating)
        VALUES ('happy', '1500'),
        ('end', '2000')
    """)

    cursor.execute("""CREATE TABLE game_hist(
        hist_id INT(11) AUTO_INCREMENT NOT NULL,
        playerA INT(11) NOT NULL,
        playerB INT(11) NOT NULL,
        PRIMARY KEY (hist_id)
    )""")


    connection.commit()
    connection.close()