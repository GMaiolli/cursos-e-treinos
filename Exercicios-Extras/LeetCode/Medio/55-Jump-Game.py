class Solution:
    def canJump(self, nums: list[int]) -> bool:
        inx = 0
        n = len(nums)

        for i, salto in enumerate(nums):
            if i > inx:
                return False
            inx = max(inx, i + salto)

            if inx >= n - 1:
                return True
        return False        