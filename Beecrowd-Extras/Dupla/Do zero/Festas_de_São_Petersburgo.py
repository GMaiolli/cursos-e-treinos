import sys

def solve():
    def get_input():
        for line in sys.stdin:
            for word in line.split():
                yield word

    tokens = get_input()
    out = sys.stdout.write
    
    while True:
        try:
            n = int(next(tokens))
            m = int(next(tokens))
            k = int(next(tokens))
        except StopIteration:
            break
        
        adj = [[] for _ in range(n + 1)]
        grau = [0] * (n + 1)
        
        for _ in range(m):
            u = int(next(tokens))
            v = int(next(tokens))
            adj[u].append(v)
            adj[v].append(u)
            grau[u] += 1
            grau[v] += 1
        
        removido = [False] * (n + 1)
        fila = [i for i in range(1, n + 1) if 0 < grau[i] < k]
        
        ptr = 0
        while ptr < len(fila):
            u = fila[ptr]
            ptr += 1
            removido[u] = True
            
            for v in adj[u]:
                if not removido[v]:
                    grau[v] -= 1
                    if grau[v] < k:
                        removido[v] = True
                        fila.append(v)
        
        res = [str(i) for i in range(1, n + 1) if grau[i] >= k]
        
        if res:
            out(" ".join(res) + "\n")
        else:
            out("0\n")

if __name__ == "__main__":
    solve()