import cv2
from cv2 import erode
import numpy as np

image = cv2.imread("images/diag_board2.jpg")
# image = cv2.blur(image, (3, 3))

neiborhood = np.array([[1, 1, 1], [1, 1, 1], [1, 1, 1]])

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# gray2 = cv2.bitwise_not(gray)
# ret, split = cv2.threshold(gray2, 80, 255, cv2.THRESH_BINARY)
split = cv2.Canny(gray, 30, 300, L2gradient=True)
dilate_image = cv2.dilate(split, neiborhood, iterations=2)
erode_image = cv2.erode(dilate_image,neiborhood,iterations=3)

lines = cv2.HoughLinesP(
    erode_image, rho=1, theta=np.pi / 360, threshold=50, minLineLength=len(image[0]) // 10, maxLineGap=len(image[0]) // 20
)

print(lines)

for line in lines:
    x1, y1, x2, y2 = line[0]

    red_line_img = cv2.line(image, (x1, y1), (x2, y2), (0, 0, 255), 3)

cv2.imshow("line", red_line_img)
cv2.waitKey()
