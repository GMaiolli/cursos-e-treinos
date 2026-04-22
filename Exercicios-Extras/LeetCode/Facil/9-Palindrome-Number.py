class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        
        invertido = int(str(x)[::-1])

        if invertido == x:
            return True
        return False