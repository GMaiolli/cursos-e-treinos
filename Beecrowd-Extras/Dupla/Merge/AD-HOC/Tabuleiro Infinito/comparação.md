# Relatório Técnico: O Problema da Linha Infinita

## Análise Algorítmica e Otimização da Equação Diofantina Linear

---

## 1. O Desafio: "Infinity Row"

O problema propõe encontrar o número mínimo de movimentos para deslocar uma peça em uma linha infinita de uma posição inicial $0$ para uma posição adjacente ($1$ ou $-1$).

**Movimentos permitidos:**
- $D$ casas para a direita  
- $E$ casas para a esquerda  

**Objetivo:**
Minimizar $|x| + |y|$, onde:
- $Dx - Ey = 1$  
ou  
- $Dx - Ey = -1$

Este é um problema clássico que pode ser modelado através de uma **Equação Diofantina Linear** da forma:

$$
ax + by = c
$$

---

## 2. Abordagens Iniciais

Antes de chegar à solução final, foram analisadas duas implementações distintas do **Algoritmo de Euclides Estendido**, cada uma com seus pontos fortes e limitações.

### A. Foco em Regra de Negócio (Python)

A primeira implementação focou na otimização do resultado.

**Ponto positivo:**
- Utilização de aritmética modular para encontrar a menor combinação de movimentos, garantindo que a distância total percorrida fosse mínima.

**Ponto negativo:**
- Código acoplado: a lógica matemática e a lógica de exibição estavam misturadas, dificultando o reaproveitamento.

---

### B. Foco em Estrutura e Engenharia (C#)

A segunda implementação priorizou a organização de software.

**Ponto positivo:**
- Encapsulamento do algoritmo em uma função dedicada (`ExtendedGCD`), com nomenclatura acadêmica clara e boa manutenibilidade.

**Ponto negativo:**
- Retorno de uma solução "bruta": coeficientes potencialmente muito altos, não atendendo ao requisito de minimizar a quantidade de movimentos.

---

## 3. Diferenciais da Implementação

| Recurso                         | Descrição |
|--------------------------------|----------|
| **Modularização**              | A lógica do MDC Estendido é isolada, permitindo reutilização em outros problemas (criptografia, teoria dos números). |
| **Aritmética Modular**         | O uso de `x % E` garante que a solução encontrada seja a menor dentro do ciclo. |
| **Princípio da Responsabilidade Única** | Cada função possui um objetivo claro: uma calcula o MDC, outra resolve a lógica do problema. |

---

## 4. Conclusão

A resolução deste problema evidencia a importância de ir além de simplesmente "fazer o código funcionar".

A combinação entre:
- **otimização matemática**, e  
- **boa arquitetura de software**

resultou em uma solução:

- performática  
- legível  
- robusta para casos de borda com grandes volumes de dados (até $10^6$)