import MySQLdb
import datetime

PALAMS = {"host": "localhost", "user": "root", "passwd": "root", "db": "python_db"}


def initialize():
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute("DROP TABLE IF EXISTS user_info")
    cursor.execute("DROP TABLE IF EXISTS rate_hist")
    cursor.execute("DROP TABLE IF EXISTS game_result")

    cursor.execute(
        """CREATE TABLE user_info(
        user_id VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        name VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        PRIMARY KEY (user_id)
        )"""
    )

    # テスト用
    cursor.execute(
        """INSERT INTO user_info (user_id, name)
        VALUES ('aaa', 'takashi'),
        ('bbb', 'hiroshi'),
        ('ccc', 'takoshi')
        """
    )

    cursor.execute(
        """CREATE TABLE rate_hist(
        id INT(11) AUTO_INCREMENT NOT NULL,
        user_id VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        rate INT NOT NULL,
        time TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
        )"""
    )

    # テスト用
    cursor.execute(
        """INSERT INTO rate_hist (user_id, rate, time)
        VALUES ('aaa', '1500', '2020-01-19 05:14:07'),
        ('bbb', '1600', '2021-02-19 04:14:01'),
        ('ccc', '1700', '2021-03-29 03:43:23')
        """
    )

    cursor.execute(
        """CREATE TABLE game_result(
        hist_id INT(11) AUTO_INCREMENT NOT NULL,
        black VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        white VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        result INT NOT NULL,
        PRIMARY KEY (hist_id)
        )"""
    )

    # テスト用
    # cursor.execute(
    #     """INSERT INTO game_result (black, white, result)
    #     VALUES ('jfalrj', 'enrqjw', '-1'),
    #     ('jfalrj', 'enrqjw', '0'),
    #     ('jfalrj', 'enrqjw', '1'),
    #     ('jfalrj', 'enrqjw', '-1')
    #     """
    # )

    connection.commit()
    connection.close()


def get_all_pair():
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(f"""SELECT * FROM user_info""")
    datas = cursor.fetchall()
    connection.commit()
    connection.close()

    ret = []
    for info in datas:
        ret.append({"id": info[0], "name": info[1]})
    return ret


def get_current_rate(id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()

    # TODO get latest rate

    cursor.execute(f"""SELECT * FROM rate_hist WHERE user_id='{id}' LIMIT 1""")
    datas = cursor.fetchall()
    connection.commit()
    connection.close()

    ret = []
    for info in datas:
        ret.append({"rate": info[2]})
    return ret


def get_all_rate(id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(f"""SELECT * FROM rate_hist WHERE user_id='{id}'""")
    datas = cursor.fetchall()
    connection.commit()
    connection.close()

    ret = []
    for info in datas:
        ret.append({"rate": info[2], "time": info[3]})
    return ret


def update_rate(id, new_rate):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        f"""INSERT INTO rate_hist (user_id, rate, time)
        VALUES ('{id}', '{new_rate}', '{datetime.datetime.now()}')
        """
    )
    connection.commit()
    connection.close()
    return


def update_result(black, white, result):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        f"""INSERT INTO game_result (black, white, result)
        VALUES ('{black}', '{white}', '{result}')
        """
    )
    connection.commit()
    connection.close()
    return


def get_all_result():
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(f"""SELECT * FROM game_result""")
    datas = cursor.fetchall()
    connection.commit()
    connection.close()

    ret = []
    for info in datas:
        ret.append({"black": info[1], "white": info[2], "result": info[3]})
    return ret


def id_in_sql(id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(f"""SELECT * FROM user_info WHERE user_id='{id}'""")
    datas = cursor.fetchall()
    connection.commit()
    connection.close()

    ret = len(datas) > 0
    return ret
