class Solution:
    def largestTriangleArea(self, points: list[list[int]]) -> float:
        points.sort()
        if len(points) < 3: return 0.0
        
        hull = []

        for p in points:
            while len(hull) >= 2:
                o, a = hull[-2], hull[-1]
                if (a[0] - o[0]) * (p[1] - o[1]) - (a[1] - o[1]) * (p[0] - o[0]) <= 0:
                    hull.pop()
                else: break
            hull.append(p)
        
        lower_len = len(hull)
        for i in range(len(points) - 2, -1, -1):
            p = points[i]
            while len(hull) > lower_len:
                o, a = hull[-2], hull[-1]
                if (a[0] - o[0]) * (p[1] - o[1]) - (a[1] - o[1]) * (p[0] - o[0]) <= 0:
                    hull.pop()
                else: break
            hull.append(p)
        hull.pop()

        max_area_2 = 0
        h_len = len(hull)
        
        xs = [p[0] for p in hull]
        ys = [p[1] for p in hull]
        
        for i in range(h_len):
            x1, y1 = xs[i], ys[i]
            for j in range(i + 1, h_len):
                x2, y2 = xs[j], ys[j]
                for k in range(j + 1, h_len):
                    x3, y3 = xs[k], ys[k]
                    area_2 = abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2))
                    if area_2 > max_area_2:
                        max_area_2 = area_2
        
        return max_area_2 / 2.0