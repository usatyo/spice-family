import cv2
import numpy as np

BOARD = 19
ALPHA = 10
OFFSET = 41


def calc_rate(winner: int, loser: int, hande: int):
    new_win = int(winner + (0.04 * (loser - winner - hande * ALPHA) + 16))
    new_lose = int(loser - (0.04 * (loser - winner - hande * ALPHA) + 16))
    return new_win, new_lose


def gen_boardimg(state):
    board = cv2.imread("images/base.png") / 255
    black = cv2.imread("images/black.png", -1)
    white = cv2.imread("images/white.png", -1)
    black = cv2.resize(black, dsize=None, fx=0.05, fy=0.05)
    white = cv2.resize(white, dsize=None, fx=0.05, fy=0.05)
    centerX, centerY = board.shape[:2]
    centerX, centerY = centerX // 2, centerY // 2
    width, height = black.shape[:2]
    b_mask = black[:, :, 3] * 255
    w_mask = white[:, :, 3] * 255
    b_mask = cv2.cvtColor(b_mask, cv2.COLOR_GRAY2BGR)
    w_mask = cv2.cvtColor(w_mask, cv2.COLOR_GRAY2BGR)
    black = black[:, :, :3] / 255
    white = white[:, :, :3] / 255

    for i in range(BOARD):
        for j in range(BOARD):
            left = centerX - width // 2 - OFFSET * (BOARD // 2 - j)
            right = left + width
            top = centerY - height // 2 - OFFSET * (BOARD // 2 - i)
            bottom = top + height
            if state[i][j] == 1:
                board[top:bottom, left:right] *= 1 - b_mask
                board[top:bottom, left:right] += black * b_mask
            elif state[i][j] == 2:
                board[top:bottom, left:right] *= 1 - w_mask
                board[top:bottom, left:right] += white * w_mask

    board = np.clip(board * 255, a_min=0, a_max=255).astype(np.uint8)
    # cv2.imshow("alpha", board)
    # cv2.waitKey()
    cv2.imwrite("files/output.jpg", board)

    return 


# st = [
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
# ]
# gen_boardimg(st)
