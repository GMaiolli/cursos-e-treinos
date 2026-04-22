class Solution:
    def romanToInt(self, s: str) -> int:
        valores = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50, 
            'C': 100, 'D': 500, 'M': 1000
        }
        res = 0
        for i in range(len(s)):
            atual = valores[s[i]]
            if i + 1 < len(s) and atual < valores[s[i+1]]:
                res -= atual
            else:
                res += atual
        return res