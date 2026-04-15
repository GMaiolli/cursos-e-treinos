import sys

D, E = 7, 10

a, b = D, E
x0, x1 = 1, 0
y0, y1 = 0, 1

#Algoritmo de Euclides Estendido

#Encontra uma solução "bruta" para 7x + 10y = 1
while b != 0:
    q = a // b
    a, b = b, a % b

    x0, x1 = x1, x0 - q * x1
    y0, y1 = y1, y0 - q * y1

if a != 1:
    print("IMPOSSIVEL")
else:
    #Ajustam essa solução para os valores mais baixos possíveis (perto de zero)
    x_pos = (x0 % E + E) % E
    y_pos = (1 - D * x_pos) // E
    #Conta o total de pulos (não importa se pra frente ou pra trás, cada pulo conta como 1)
    adj1 = abs(x_pos) + abs(y_pos)
    
    #Ajustam essa solução para os valores mais baixos possíveis (perto de zero)
    x_neg = ((-x0) % E + E) % E
    y_neg = (-1 - D * x_neg) // E
    #Conta o total de pulos (não importa se pra frente ou pra trás, cada pulo conta como 1)
    adj_neg1 = abs(x_neg) + abs(y_neg)
    
    print(int(min(adj1, adj_neg1)))