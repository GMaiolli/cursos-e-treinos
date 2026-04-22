class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        res = int(dividend / divisor)
        maxint = 2147483647
        minint = -2147483648
        if res > maxint:
            return maxint
        if res < minint:
            return minint
        return res