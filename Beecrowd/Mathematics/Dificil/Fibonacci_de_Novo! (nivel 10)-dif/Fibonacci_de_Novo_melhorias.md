# Melhorias no exercicio Fibonacci de Novo!

Arquivo melhorado: `Fibonacci_de_Novo_melhorado.js`

## O que foi melhorado
- Entrada mais robusta com `trim()` e quebra por `\r?\n`.
- Ignora linhas vazias e linhas incompletas sem quebrar a execucao.
- Funcoes separadas por responsabilidade:
  - `getPisanoPeriod(m)`
  - `multiply2x2(A, B, mod)`
  - `fibMod(n, mod)`
- Uso consistente de `BigInt` nas contas modulares para evitar erro de tipo.
- Tratamento de caso invalido para `M <= 0`.
- Saida acumulada em array e escrita unica no final.

## Como foi melhorado
- Mantida a estrategia eficiente original: periodo de Pisano + exponenciacao rapida de matriz.
- Reescrita da funcao de Fibonacci modular com contrato claro: `fibMod` recebe modulo como `BigInt`.
- Reducao de conversoes desnecessarias entre `Number` e `BigInt` durante o calculo.

## Por que melhora
- Aumenta confiabilidade numerica em casos grandes.
- Facilita manutencao e testes unitarios de cada etapa.
- Mantem boa performance com codigo mais legivel e previsivel.
