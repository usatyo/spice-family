import MySQLdb
import datetime
import os

BOARD = 19

PALAMS = {
    "database": os.environ.get("DB_NAME"),
    "user": os.environ.get("DB_USERNAME"),
    "password": os.environ.get("DB_PASSWORD"),
    "host": os.environ.get("DB_HOSTNAME"),
}


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

    cursor.execute(
        """CREATE TABLE game_result(
        game_id INT(11) AUTO_INCREMENT NOT NULL,
        black VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        white VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
        hande INT(11) NOT NULL,
        corner VARCHAR(100) NOT NULL,
        result INT NOT NULL,
        time TIMESTAMP NOT NULL,
        PRIMARY KEY (game_id)
        )"""
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
        ret.append({"value": info[0], "label": info[1]})
    return ret


def get_current_rate(id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
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

    ret = {}

    for info in datas:
        date = map(int, str(info[3].date()).split("-"))
        date = "/".join(map(str, date))
        ret[date] = info[2]
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


def name_in_sql(name):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM user_info WHERE name=%s", [(name)])
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


def get_record(game_id, turn):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        "SELECT state FROM game_record_store WHERE game_id=%s AND turn=%s",
        [(str(game_id)), (str(turn))],
    )
    data = cursor.fetchall()
    connection.commit()
    connection.close()

    if data == ():
        return -1
    state = [[0] * BOARD for _ in range(BOARD)]
    for i in range(BOARD):
        for j in range(BOARD):
            state[i][j] = data[0][0][i * BOARD + j]

    return state


def new_game(black, white, hande):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        """INSERT INTO game_result (black, white, hande, corner, result, time)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        [
            (black),
            (white),
            (hande),
            (",".join(["0"] * 8)),
            ("0"),
            (str(datetime.datetime.now())),
        ],
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
        [(game_id), ("0"), ("0" * (BOARD**2))],
    )
    connection.commit()
    connection.close()
    return game_id


def get_black_white(game_id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        "SELECT black, white FROM game_result WHERE game_id=%s", [(str(game_id))]
    )
    datas = cursor.fetchall()[0]
    black, white = datas[0], datas[1]
    connection.commit()
    connection.close()
    return black, white


def register_corner(game_id, x, y):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        """UPDATE game_result SET corner=%s
        WHERE game_id=%s
        """,
        [(",".join(map(str, x + y))), (game_id)],
    )
    connection.commit()
    connection.close()
    return


def get_corner(game_id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        """SELECT corner FROM game_result
        WHERE game_id=%s
        """,
        [(game_id)],
    )
    datas = cursor.fetchall()
    connection.commit()
    connection.close()
    xy = datas[0][0].split(",")
    x = xy[:4]
    y = xy[4:]
    return x, y


def register_user(id, name):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        """INSERT INTO user_info (user_id, name)
        VALUES (%s, %s)
        """,
        [(id), (name)],
    )
    connection.commit()
    connection.close()
    return


def get_name(id):
    connection = MySQLdb.connect(**PALAMS)
    cursor = connection.cursor()
    cursor.execute(
        """SELECT name FROM user_info WHERE user_id=%s
        """,
        [(id)],
    )
    name = cursor.fetchall()[0][0]
    connection.commit()
    connection.close()
    return name
