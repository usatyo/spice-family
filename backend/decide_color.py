import cv2
from utility import gen_boardimg
import numpy as np

BOARD = 19


def color_array(image):
    image = cv2.blur(image, (3, 3))

    rgbImage = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    hsvImage = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    ost = 800 / BOARD
    x = ost / 2
    y = ost / 2
    ret = [[0] * BOARD for _ in range(BOARD)]

    print(len(rgbImage))

    for i in range(BOARD):
        for j in range(BOARD):
            centerX = int(x + ost * j)
            centerY = int(y + ost * i)
            center = (centerX, centerY)
            circle_image = cv2.circle(image, center, 3, (255, 0, 0), thickness=-1)
            pixel = hsvImage[centerY - 2 : centerY + 3, centerX - 2 : centerX + 3, 2]
            bright = np.mean(pixel)
            if bright > 230:
                ret[i][j] = 2
            elif bright > 100:
                ret[i][j] = 0
            else:
                ret[i][j] = 1

    gen_boardimg(ret)
    cv2.imwrite("files/test.jpg", circle_image)
    return

    # cv2.imshow("image", circle_image)
    # cv2.waitKey()
