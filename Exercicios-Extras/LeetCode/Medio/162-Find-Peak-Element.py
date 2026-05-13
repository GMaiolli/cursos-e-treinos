nums = [1,2,1]
l, r = 0, len(nums) - 1

if nums[l] > nums[l + 1]:
    print(l)
elif nums[r] > nums[r - 1]:
    print(r)
else:
    r -= 1
    l += 1
while l < r:
    if nums[l - 1] < nums[l] > nums[l + 1]:
        print(l)
    elif nums[r - 1] < nums[r] > nums[r + 1]:
        print(r)
    else:
        m = (l + r) // 2
        if nums[m-1] > nums[m + 1]:
            r = m
        else:
            l = m
print(l)