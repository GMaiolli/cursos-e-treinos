nums = [10,9,2,5,3,7,101,18]
tails = []
for x in nums:
    l, r = 0, len(tails)
    while l < r:
        m = (l + r) // 2
        if tails[m] < x:
            l = m + 1
        else:
            r = m
    pos = l

    if pos == len(tails):
        tails.append(x)
    else:
        tails[pos] = x
print(len(tails))