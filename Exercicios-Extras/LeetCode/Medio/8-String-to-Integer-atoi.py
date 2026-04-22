import re

class Solution:
    def myAtoi(self, s: str) -> int:
        match = re.match(r'^\s*([+-]?\d+)', s)
        if not match: return 0
        
        num = int(match.group(1))
        return max(-2**31, min(num, 2**31 - 1))