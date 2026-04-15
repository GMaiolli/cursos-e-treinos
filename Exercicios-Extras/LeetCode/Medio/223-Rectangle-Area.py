class Solution:
    def computeArea(self, ax1: int, ay1: int, ax2: int, ay2: int, bx1: int, by1: int, bx2: int, by2: int) -> int:
        areaA = (ax2 - ax1) * (ay2 - ay1)

        areaB = (bx2 - bx1) * (by2 - by1)

        inter_x1 = max(ax1, bx1)
        inter_x2 = min(ax2, bx2)

        inter_y1 = max(ay1, by1)
        inter_y2 = min(ay2, by2)

        inter_width = max(0, inter_x2 - inter_x1)
        inter_height = max(0, inter_y2 - inter_y1)

        areaC = inter_width * inter_height

        return areaA + areaB - areaC