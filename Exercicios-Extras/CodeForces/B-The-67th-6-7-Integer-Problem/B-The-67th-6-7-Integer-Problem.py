import sys

def solve():
    input_data = sys.stdin.read().split()
    it = iter(input_data)
    t = int(next(it))
    for _ in range(t):
        seq = []
        for _ in range(7):
            seq.append(int(next(it)))
        seq.sort()
        sum = 0
        for i in range(6):
            sum -= seq[i]
        sum += seq[6]
        print(sum)

if __name__ == "__main__":
    solve()