import cv2
from utility import gen_boardimg

BOARD = 19

def color_array():
    image = cv2.imread("files/corrected.png")
    image = cv2.blur(image, (3, 3))

    rgbImage = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    hsvImage = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    ost = 447 / (BOARD - 1)
    x = 95
    y = 41
    ret = [[0] * BOARD for _ in range(BOARD)]

    print(len(rgbImage))

    for i in range(BOARD):
        for j in range(BOARD):
            centerX = int(x + ost * i)
            centerY = int(y + ost * j)
            # center = (centerX, centerY)
            # circle_image = cv2.circle(image, center, 3, (255, 0, 0), thickness=-1)
            pixel = hsvImage[centerY, centerX]
            bright = pixel[2]
            if bright > 200:
                ret[i][j] = 1
            elif bright > 100:
                ret[i][j] = 0
            else:
                ret[i][j] = 2


    gen_boardimg(ret)

    # cv2.imwrite("output_up_stone.jpg", circle_image)
    # cv2.imshow("image", circle_image)
    # cv2.waitKey()
