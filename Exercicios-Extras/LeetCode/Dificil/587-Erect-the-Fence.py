class Solution:
    def outerTrees(self, trees: list[list[int]]) -> list[list[int]]:
        trees.sort()
        
        def cross_product(o, a, b):
            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
        
        if len(trees) <= 1:
            return trees

        lower = []
        for p in trees:
            while len(lower) >= 2 and cross_product(lower[-2], lower[-1], p) < 0:
                lower.pop()
            lower.append(tuple(p))
            
        upper = []
        for p in reversed(trees):
            while len(upper) >= 2 and cross_product(upper[-2], upper[-1], p) < 0:
                upper.pop()
            upper.append(tuple(p))
            
        return [list(p) for p in set(lower + upper)]