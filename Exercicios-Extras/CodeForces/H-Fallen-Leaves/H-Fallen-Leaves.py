import sys
from collections import defaultdict

def solve():
    input_data = sys.stdin.read().split()
    it = iter(input_data)
    t = int(next(it))

    for _ in range(t):
        n = int(next(it))
        adj = defaultdict(list)

        for _ in range(n - 1):
            u, v = int(next(it)), int(next(it))
            adj[u].append(v)
            adj[v].append(u)

        is_leaf = [False] + [len(adj[i]) == 1 for i in range(1, n + 1)]
        total_leaves = sum(is_leaf)

        if total_leaves <= 1:
            print(0)
            continue

        leaf_count = [0] * (n + 1)
        parent = [-1] * (n + 1)
        order = []
        visited = [False] * (n + 1)
        stack = [1]
        visited[1] = True
        while stack:
            v = stack.pop()
            order.append(v)
            for nb in adj[v]:
                if not visited[nb]:
                    visited[nb] = True
                    parent[nb] = v
                    stack.append(nb)

        for v in reversed(order):
            if is_leaf[v]:
                leaf_count[v] = 1
            for nb in adj[v]:
                if nb != parent[v]:
                    leaf_count[v] += leaf_count[nb]

        base_cost = sum(leaf_count[v] % 2 for v in range(1, n + 1) if parent[v] != -1)

        if total_leaves % 2 == 0:
            print(base_cost)
            continue

        ganho_acum = [0] * (n + 1)
        for v in order:  
            if parent[v] == -1:
                continue
            delta = 1 if leaf_count[v] % 2 == 1 else -1
            ganho_acum[v] = ganho_acum[parent[v]] + delta

        max_ganho = max(ganho_acum[v] for v in range(1, n + 1) if is_leaf[v])
        print(base_cost - max_ganho)

if __name__ == "__main__":
    solve()