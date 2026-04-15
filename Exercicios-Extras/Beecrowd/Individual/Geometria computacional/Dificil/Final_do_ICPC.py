import math
import random

def dist(p1, p2):
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

def ponto_medio(p1, p2):
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]

def circuncentro(A, B, C):
    x1, y1 = A; x2, y2 = B; x3, y3 = C
    D = 2 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2))
    if abs(D) < 1e-9: return None 
    ux = ((x1**2 + y1**2) * (y2 - y3) + (x2**2 + y2**2) * (y3 - y1) + (x3**2 + y3**2) * (y1 - y2)) / D
    uy = ((x1**2 + y1**2) * (x3 - x2) + (x2**2 + y2**2) * (x1 - x3) + (x3**2 + y3**2) * (x2 - x1)) / D
    return [ux, uy]

instancia = 1
while True:
    try:
        linha = input().split()
        if not linha: continue
        n = int(linha[0])
        if n == 0: break
            
        pontos = []
        for _ in range(n):
            pontos.append(list(map(float, input().split())))

        random.shuffle(pontos)

        centro = pontos[0]
        r = 0.0

        for i in range(n):
            if dist(pontos[i], centro) > r + 1e-9:
                centro = pontos[i]
                r = 0.0
                
                for j in range(i):
                    if dist(pontos[j], centro) > r + 1e-9:
                        centro = ponto_medio(pontos[i], pontos[j])
                        r = dist(pontos[i], centro)
                        
                        for k in range(j):
                            if dist(pontos[k], centro) > r + 1e-9:
                                novo_c = circuncentro(pontos[i], pontos[j], pontos[k])
                                if novo_c:
                                    centro = novo_c
                                    r = dist(pontos[i], centro)

        print(f"Instancia {instancia}")
        print(f"{centro[0]:.2f} {centro[1]:.2f} {r:.2f}")
        print() 
        instancia += 1

    except EOFError:
        break