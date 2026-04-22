class Solution:
    def intToRoman(self, num: int) -> str:
        valores = [
            (1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'),
            (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'),
            (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')
        ]

        resultado = ""

        for valor, simbolo in valores:
            quantidade = num // valor
            resultado += simbolo * quantidade
            num %= valor
        return resultado