from math import atan, cos, sin
import cv2
import numpy as np
# from correct_board import cor_board


def det_board(image):
    neiborhood = np.array([[1, 1, 1], [1, 1, 1], [1, 1, 1]])

    # 白黒画像に変換
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # エッジ検出
    split = cv2.Canny(gray, 30, 300, L2gradient=True)

    # 線の膨張、収縮でエッジ間の隙間を消す
    dilate_image = cv2.dilate(split, neiborhood, iterations=1)
    erode_image = cv2.erode(dilate_image, neiborhood, iterations=2)
    
    # 直線を検出、画像幅の10分の1以上の長さの線のみ認識
    lines = cv2.HoughLinesP(
        erode_image,
        rho=1,
        theta=np.pi / 360,
        threshold=50,
        minLineLength=len(image[0]) // 10,
        maxLineGap=len(image[0]) // 20,
    )

    # リストに変換
    line_array = [list(line[0]) for line in lines]
    line_theta = []

    # 各線分の頂点情報の末尾に角度の情報を追加
    for line in line_array:
        x1, y1, x2, y2 = line
        line_theta.append([[x1, y1], [x2, y2], atan((y1 - y2) / (x1 - x2))])
        # red_line_img = cv2.line(image, (x1, y1), (x2, y2), (0, 0, 255), 3)

    # 線分を角度の大きさ順にソート
    line_theta.sort(key=lambda x: x[-1])

    theta_border = np.pi / 6

    # 線分を順に見ていき、角度の変化が30度以上あった部分を
    # 縦線、横線の境界とする
    # 縦線、横線、いずれかの角度の平均値を計算
    para_theta = []
    sum_flag = False
    for i in range(len(line_theta)):
        if line_theta[i][-1] - line_theta[i - 1][-1] > theta_border:
            sum_flag = not sum_flag
        if sum_flag:
            para_theta.append(line_theta[i][-1])

    mean_theta = sum(para_theta) / len(para_theta)

    # 求めた平均値との差が45度である角度を求める
    theta = [mean_theta + np.pi / 4, mean_theta - np.pi / 4]

    # 全ての線分の端点についてその点を通る角度thetaの直線のy切片の
    # 最大値、最小値を取る点を求める
    # その点は碁盤の四隅とみなせる
    min_p = [10**10, 10**10]
    max_p = [0, 0]
    cnrs = [[[], []], [[], []]]
    for i in [0, 1]:
        c = cos(theta[i])
        s = sin(theta[i])
        for j in range(2):
            for line in line_theta:
                y_const = line[j][1] * c - line[j][0] * s
                if min_p[i] > y_const:
                    min_p[i] = y_const
                    cnrs[i][0] = line[j]
                if max_p[i] < y_const:
                    max_p[i] = y_const
                    cnrs[i][1] = line[j]

    ret_x = [cnrs[0][0][0], cnrs[1][0][0], cnrs[0][1][0], cnrs[1][1][0]]
    ret_y = [cnrs[0][0][1], cnrs[1][0][1], cnrs[0][1][1], cnrs[1][1][1]]
    # cv2.imwrite("images/output.jpg", image)
    # cv2.imshow("line", image)
    # cv2.waitKey()
    return ret_x, ret_y

    # for i in range(2):
    #     circle_image = cv2.circle(
    #         image, (cnrs[i][0][0], cnrs[i][0][1]), 10, (255, 0, 0), thickness=-1
    #     )
    #     circle_image = cv2.circle(
    #         image, (cnrs[i][1][0], cnrs[i][1][1]), 10, (255, 0, 0), thickness=-1
    #     )

    # print(*[degrees(i) for i in theta])


# 画像の読み込み
# image = cv2.imread("images/diag_board4.jpg")
# x, y = det_board(image)
# cor_board(image, x, y)
