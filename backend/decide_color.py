
import cv2

BOARD = 19

image = cv2.imread("images/up_stone.jpg")
image = cv2.blur(image, (3, 3))

rgbImage = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
hsvImage = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

ost = 447 / (BOARD - 1)
x = 95
y = 41
ans = [''] * BOARD

print(len(rgbImage))

for i in range(BOARD):
  for j in range(BOARD):
    centerX = int(x + ost * i)
    centerY = int(y + ost * j)
    center = (centerX, centerY)
    circle_image = cv2.circle(image, center, 3, (255,0,0), thickness=-1)
    pixel = hsvImage[centerY, centerX]
    bright = pixel[2]
    if bright > 200:
      ans[j] = ans[j] + '# '
    elif bright > 100:
      ans[j] = ans[j] + '  '
    else:
      ans[j] = ans[j] + '. '
    

for i in range(BOARD):
  print(ans[i])

# cv2.imshow("image", circle_image)
# cv2.waitKey()

