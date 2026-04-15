quantidade = int(input())

for _ in range(quantidade):
    n = int(input())
    
    print(f"{int((pow(2, n) / 12) // 1000)} kg")