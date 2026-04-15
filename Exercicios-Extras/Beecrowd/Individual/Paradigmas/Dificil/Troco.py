import sys

def resolver():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    
    idx = 0
    while idx < len(input_data):
        try:
            V = int(input_data[idx])
            M = int(input_data[idx+1])
            idx += 2
            
            moedas = input_data[idx : idx + M]
            idx += M
            
            possibilidades = 1
            
            for m in moedas:
                moeda_valor = int(m)
                possibilidades |= (possibilidades << moeda_valor)
                
                if (possibilidades >> V) & 1:
                    break
            
            if (possibilidades >> V) & 1:
                print("S")
            else:
                print("N")
                
        except (EOFError, IndexError):
            break

if __name__ == "__main__":
    resolver()