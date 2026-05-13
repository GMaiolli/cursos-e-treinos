nums = [10,5,13,4,8,4,5,11,14,9,16,10,20,8]
target = 11

l, r = 0, len(nums) - 1
xD = []
x = 0
bleh = 1
while l < r:
    if nums[l] == target or nums[r] == target:
        print(1)
    if bleh == 1:
        x += nums[l] + nums[r]
    else:
        x += nums[r]
    bleh += 1

    if x >= target:
        xD.append(bleh)
        x = 0
        r = len(nums) - 1
        l += 1
        bleh = 1
    else:
        r -= 1
if len(xD) == 0:
    print(0)
else:
    print(min(xD))