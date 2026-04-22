import math

class Solution:
    def pivotInteger(self, n: int) -> int:
        y = n * (n + 1) // 2

        x = math.isqrt(y)

        if x * x == y:
            return x
        return -1