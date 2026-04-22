import math

class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        numeros = [str(i) for i in range(1, n + 1)]
        k -= 1
        resultado = []
        for i in range(n, 0, -1):
            fatorial_atual = math.factorial(i - 1)
            indice = k // fatorial_atual
            resultado.append(numeros.pop(indice))
            k %= fatorial_atual

        return "".join(resultado)