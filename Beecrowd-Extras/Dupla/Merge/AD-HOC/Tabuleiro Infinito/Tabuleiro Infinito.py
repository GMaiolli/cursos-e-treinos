def extended_gcd(a, b):
    """Retorna (gcd, x, y) tal que ax + by = gcd"""
    old_r, r = a, b
    old_s, s = 1, 0
    old_t, t = 0, 1
    
    while r != 0:
        q = old_r // r
        old_r, r = r, old_r - q * r
        old_s, s = s, old_s - q * s
        old_t, t = t, old_t - q * t
        
    return old_r, old_s, old_t

def resolver_minimo_pulos(D, E):
    gcd, x0, y0 = extended_gcd(D, E)
    
    if gcd != 1:
        return "IMPOSSIVEL"

    # --- Estratégia de Otimização (Sua Contribuição) ---
    
    # Caso 1: Alvo é 1 (7x + 10y = 1)
    # Ajustamos x para ser o menor positivo possível usando módulo E
    x_pos = x0 % E
    y_pos = (1 - D * x_pos) // E
    dist1 = abs(x_pos) + abs(y_pos)
    
    # Caso 2: Alvo é -1 (7x + 10y = -1) -> equivalente a -(7x + 10y) = 1
    # Testamos a inversão para ver se o caminho é mais curto
    x_neg = (-x0) % E
    y_neg = (-1 - D * x_neg) // E
    dist2 = abs(x_neg) + abs(y_neg)
    
    return min(dist1, dist2)

# Teste
D, E = 7, 10
print(f"Mínimo de pulos: {resolver_minimo_pulos(D, E)}")