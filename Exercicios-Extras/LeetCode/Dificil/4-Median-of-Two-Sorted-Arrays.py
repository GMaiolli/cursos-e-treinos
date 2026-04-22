class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        nums = nums1 + nums2

        nums.sort()

        n = len(nums)

        meio = n // 2

        if n % 2 == 0:
            return (nums[meio - 1] + nums[meio]) / 2

        return nums[meio]