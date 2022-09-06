import cv2
import numpy as np

def cor_board(image,x,y):
    # image = cv2.imread("images/diag_stone2.png")
    image = cv2.blur(image, (3, 3))


    # x = [90, 365, 47, 397]
    # y = [8, 8, 270, 273]
    # x = [1050, 2020, 420, 2720]
    # y = [940, 950, 1640, 1630]

    p1 = np.array([x[0], y[0]])
    p2 = np.array([x[1], y[1]])
    p3 = np.array([x[2], y[2]])
    p4 = np.array([x[3], y[3]])

    offset = 5
    height = 20 * offset * 2

    src = np.float32([p1, p2, p3, p4])
    dst = np.float32(
        [
            [offset, offset],
            [height - offset, offset],
            [height - offset, height - offset],
            [offset, height - offset],
        ]
    )

    M = cv2.getPerspectiveTransform(src, dst)
    output = cv2.warpPerspective(image, M, (height, height))

    for i in range(4):
        circle_image = cv2.circle(image, (x[i], y[i]), 10, (255, 0, 0), thickness=-1)


    # cv2.imshow("image", circle_image)
    # cv2.imshow("board_image", output)
    cv2.imwrite("files/output.jpg", output)
    # cv2.waitKey()
