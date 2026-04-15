import math

class Solution:
    def maxPoints(self, points: list[list[int]]) -> int:
        n = len(points)
        if n <= 2:
            return n
        
        max_global = 0

        for i in range(n):
            slopes = {}
            local_max = 0
            
            for j in range(n):
                if i == j:
                    continue
                
                dx = points[j][0] - points[i][0]
                dy = points[j][1] - points[i][1]

                if dx == 0 and dy == 0:
                    continue

                common = math.gcd(dx, dy)
                
                slope = (dy // common, dx // common)

                slopes[slope] = slopes.get(slope, 0) + 1
                if slopes[slope] > local_max:
                    local_max = slopes[slope]

            if local_max + 1 > max_global:
                max_global = local_max + 1

        return max_global
    
