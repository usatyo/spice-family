import MySQLdb
import datetime

BOARD = 19
PALAMS = {"host": "localhost", "user": "root", "passwd": "root", "db": "python_db"}


def initialize():
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute("DROP TABLE IF EXISTS user_info")
    cursor.execute("DROP TABLE IF EXISTS rate_hist")
    cursor.execute("DROP TABLE IF EXISTS game_result")
    cursor.execute("DROP TABLE IF EXISTS game_record_store")

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
        game_id INT(11) AUTO_INCREMENT NOT NULL,
        black VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        white VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        result INT NOT NULL,
        time TIMESTAMP NOT NULL,
        PRIMARY KEY (game_id)
        )"""
    )

    # テスト用
    cursor.execute(
        """INSERT INTO game_result (black, white, result, time)
        VALUES ('aaa', 'bbb', '-1', '2020-01-19 05:14:07'),
        ('aaa', 'ccc', '0', '2020-01-19 05:14:07'),
        ('bbb', 'ccc', '1', '2020-01-19 05:14:07'),
        ('aaa', 'bbb', '-1', '2020-01-19 05:14:07')
        """
    )

    cursor.execute(
        """CREATE TABLE game_record_store(
        record_id INT(11) AUTO_INCREMENT NOT NULL,
        game_id INT(11) NOT NULL,
        turn INT NOT NULL,
        state VARCHAR(400) NOT NULL,
        PRIMARY KEY (record_id)
        )"""
    )

    connection.commit()
    connection.close()


def get_all_pair():
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM user_info")
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

    cursor.execute(
        """SELECT * FROM rate_hist WHERE user_id=%s 
        ORDER BY id DESC LIMIT 1""",
        [(id)],
    )
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
    cursor.execute("SELECT * FROM rate_hist WHERE user_id=%s", [(id)])
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
        """INSERT INTO rate_hist (user_id, rate, time)
        VALUES (%s, %s, %s)
        """,
        [(id), (str(new_rate)), (str(datetime.datetime.now()))],
    )
    connection.commit()
    connection.close()
    return


def update_result(game_id, result):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        """UPDATE game_result SET result=%s
        WHERE game_id=%s
        """,
        [(result), (game_id)],
    )
    connection.commit()
    connection.close()
    black, white = get_black_white(game_id)
    return black, white


def get_all_result(id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM game_result WHERE black=%s OR white=%s", [(id), (id)])
    datas = cursor.fetchall()
    connection.commit()
    connection.close()

    ret = []
    for info in datas:
        ret.append(
            {"black": info[1], "white": info[2], "result": info[3], "time": info[4]}
        )
    return ret


def id_in_sql(id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM user_info WHERE user_id=%s", [(id)])
    datas = cursor.fetchall()
    connection.commit()
    connection.close()

    ret = len(datas) > 0
    return ret


def update_record(game_id, rec):
    data = ""
    for i in range(BOARD):
        for j in range(BOARD):
            data = data + str(rec[i][j])

    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        """SELECT turn FROM game_record_store WHERE game_id=%s 
        ORDER BY turn DESC LIMIT 1""",
        [(game_id)],
    )
    turn = int(cursor.fetchall()[0][0]) + 1
    cursor.execute(
        """INSERT INTO game_record_store (game_id, turn, state)
        VALUES (%s, %s, %s)
        """,
        [(str(game_id)), (str(turn)), (data)],
    )
    connection.commit()
    connection.close()
    return


def get_record(game_id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM game_record_store WHERE game_id=%s", [(str(game_id))])
    datas = cursor.fetchall()
    connection.commit()
    connection.close()

    states = []
    for data in datas:
        state = [[0] * BOARD for _ in range(BOARD)]
        for i in range(BOARD):
            for j in range(BOARD):
                state[i][j] = data[i * BOARD + j]
        states.append(state)

    return states


def new_game(black, white):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        """INSERT INTO game_result (black, white, result, time)
        VALUES (%s, %s, %s, %s)
        """,
        [(black), (white), ("0"), (str(datetime.datetime.now()))],
    )
    cursor.execute(
        """SELECT game_id from game_result 
        ORDER BY game_id DESC LIMIT 1
        """
    )
    game_id = cursor.fetchall()[0][0]
    cursor.execute(
        """INSERT INTO game_record_store (game_id, turn, state)
        VALUES (%s, %s, %s)
        """,
        [(game_id), ("0"), ("0" * (BOARD ** 2))],
    )
    connection.commit()
    connection.close()
    return game_id


def get_black_white(game_id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute("SELECT black, white FROM game_result WHERE game_id=%s", [(str(game_id))])
    datas = cursor.fetchall()[0]
    black, white = datas[0], datas[1]
    connection.commit()
    connection.close()
    return black, white