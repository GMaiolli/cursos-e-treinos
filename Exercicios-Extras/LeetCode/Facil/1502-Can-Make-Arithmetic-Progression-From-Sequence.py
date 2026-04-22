import numpy as np
class Solution:
    def canMakeArithmeticProgression(self, arr: list[int]) -> bool:
        arr.sort()

        diferencas = np.diff(arr)

        return bool(np.all(diferencas == diferencas[0]))