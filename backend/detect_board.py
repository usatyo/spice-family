from math import atan, cos, degrees, sin
import cv2
import numpy as np

# 画像の読み込み
image = cv2.imread("images/diag_board.jpg")

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

# 各線分の頂点情報の末尾に角度の情報を追加
for line in line_array:
    x1, y1, x2, y2 = line
    line.append(atan((y1 - y2) / (x1 - x2)))
    red_line_img = cv2.line(image, (x1, y1), (x2, y2), (0, 0, 255), 3)

# 線分を角度の大きさ順にソート
line_array.sort(key=lambda x: x[4])

theta_border = np.pi / 6
corner_points = []

# 線分を順に見ていき、角度の変化が30度以上あった部分を
# 縦線、横線の境界とする
# 縦線、横線、いずれかの角度の平均値を計算
para_theta = []
sum_flag = False
for i in range(len(line_array)):
    if line_array[i][4] - line_array[i - 1][4] > theta_border:
        sum_flag = not sum_flag
    if sum_flag:
        para_theta.append(line_array[i][4])

mean_theta = sum(para_theta) / len(para_theta)

# 求めた平均値との差が45度である角度を求める
theta = [mean_theta + np.pi / 4, mean_theta - np.pi / 4]

# 全ての線分の端点についてその点を通る角度thetaの直線のy切片の
# 最大値、最小値を取る点を求める
# その点は碁盤の四隅とみなせる
min_p = [10**10, 10**10]
max_p = [0, 0]
points = [[[], []], [[], []]]
for i in [0, 1]:
    for line in line_array:
        for ofst in [0, 2]:
            if min_p[i] > line[ofst + 1] * cos(theta[i]) - line[ofst + 0] * sin(
                theta[i]
            ):
                min_p[i] = line[ofst + 1] * cos(theta[i]) - line[ofst + 0] * sin(
                    theta[i]
                )
                points[i][0] = line[ofst : ofst + 2]
            if max_p[i] < line[ofst + 1] * cos(theta[i]) - line[ofst + 0] * sin(
                theta[i]
            ):
                max_p[i] = line[ofst + 1] * cos(theta[i]) - line[ofst + 0] * sin(
                    theta[i]
                )
                points[i][1] = line[ofst : ofst + 2]

for i in range(2):
    circle_image = cv2.circle(
        image, (points[i][0][0], points[i][0][1]), 10, (255, 0, 0), thickness=-1
    )
    circle_image = cv2.circle(
        image, (points[i][1][0], points[i][1][1]), 10, (255, 0, 0), thickness=-1
    )

print(*[degrees(i) for i in theta])
cv2.imshow("line", red_line_img)
# cv2.imwrite("images/output_diag_board2.jpg", red_line_img)
cv2.waitKey()
