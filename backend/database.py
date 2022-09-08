import MySQLdb

PALAMS = {"host": "localhost", "user": "root", "passwd": "root", "db": "python_db"}


def initialize():
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute("DROP TABLE IF EXISTS user_info")
    cursor.execute("DROP TABLE IF EXISTS rate_hist")
    cursor.execute("DROP TABLE IF EXISTS game_hist")

    cursor.execute(
        """CREATE TABLE user_info(
        user_id VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        name VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        PRIMARY KEY (user_id)
    )"""
    )
    cursor.execute(
        """INSERT INTO user_info (user_id, name)
        VALUES ('jfalrj', 'takashi'),
        ('enrqjw', 'hiroshi')
    """
    )

    cursor.execute(
        """CREATE TABLE rate_hist(
        id int AUTO_INCREMENT,
        user_id VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        rate int(6) NOT NULL,
        time TIMESTAMP,
        PRIMARY KEY (id)
    )"""
    )
    cursor.execute(
        """INSERT INTO rate_hist (user_id, rate, time)
        VALUES ('jfalrj', '1567', '2020-01-19 05:14:07'),
        ('jfalrj', '1632', '2021-02-19 04:14:01'),
        ('jfalrj', '1654', '2021-03-29 03:43:23'),
        ('jfalrj', '1760', '2021-06-20 06:14:46'),
        ('jfalrj', '1980', '2021-06-21 12:13:07'),
        ('enrqjw', '2045', '2021-01-19 03:14:07')
    """
    )

    cursor.execute(
        """CREATE TABLE game_hist(
        hist_id INT(11) AUTO_INCREMENT NOT NULL,
        playerA INT(11) NOT NULL,
        playerB INT(11) NOT NULL,
        move json DEFAULT NULL,
        PRIMARY KEY (hist_id)
    )"""
    )

    connection.commit()
    connection.close()


def get_all_pair():
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()

    cursor.execute(f"""SELECT * FROM user_info""")

    ret = []
    for info in cursor:
        ret.append({"id": info[0], "name": info[1]})

    connection.commit()
    connection.close()
    return ret


def update_rate(id, new_rate):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()

    connection.commit()
    connection.close()


def get_current_rate(id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()

    cursor.execute(f"""SELECT * FROM rate_hist WHERE user_id='{id}' LIMIT 1""")

    ret = []
    for info in cursor:
        ret.append({"rate": info[2]})

    connection.commit()
    connection.close()

    return ret


def get_all_rate(id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()

    cursor.execute(f"""SELECT * FROM rate_hist WHERE user_id='{id}'""")

    ret = []
    for info in cursor:
        ret.append({"rate": info[2], "time": info[3]})

    connection.commit()
    connection.close()

    return ret
