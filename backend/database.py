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
    cursor.execute("""SELECT * FROM user_info""")

    for i in cursor:
        print(i[1])

    cursor.execute("""CREATE TABLE game_hist(
        hist_id INT(11) AUTO_INCREMENT NOT NULL,
        playerA INT(11) NOT NULL,
        playerB INT(11) NOT NULL,
        move json DEFAULT NULL,
        PRIMARY KEY (hist_id)
    )""")


    connection.commit()
    connection.close()


def update_rate(id, new_rate):
    connection = MySQLdb.connect(
        host="localhost",
        user="root",
        passwd="root",
        db="python_db"
    )
    cursor = connection.cursor()

    cursor.execute(f"""UPDATE user_info SET rating={new_rate} WHERE user_id={id}""")

    connection.commit()
    connection.close()


def get_all_rate():
    connection = MySQLdb.connect(
        host="localhost",
        user="root",
        passwd="root",
        db="python_db"
    )
    cursor = connection.cursor()

    cursor.execute(f"""SELECT * from user_info""")

    ret = []
    for info in cursor:
        ret.append({"name": info[1], "rate": info[2]})

    connection.commit()
    connection.close()

    return ret