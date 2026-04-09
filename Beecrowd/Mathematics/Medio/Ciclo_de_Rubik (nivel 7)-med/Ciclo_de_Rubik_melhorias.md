# Melhorias no exercicio Ciclo de Rubik

Arquivo melhorado: `Ciclo_de_Rubik_melhorado.js`

## O que foi melhorado
- Estrutura da classe padronizada e com nomes mais claros (`Cubo`).
- Criado `estadoCanonico()` para serializar estado de forma consistente.
- `isResolvido()` passou a comparar com estado inicial interno, sem depender de parametro externo.
- Visualizacao das faces reorganizada com configuracao unica para reduzir repeticao.
- Execucao de movimentos refatorada para mapa de comandos (`mapaMovimentos`) em vez de `switch` extenso.
- Criado `executarSequencia(sequencia)` para aplicar varios movimentos de forma simples.
- Validacao de movimento invalido com erro explicito.

## Como foi melhorado
- Mantida a logica principal de rotacao por eixo (`x`, `y`, `z`).
- Refatoracao focada em legibilidade e reaproveitamento de codigo.
- Comparacao de estado feita com ordenacao por coordenadas (`x`, `y`, `z`) antes da serializacao.

## Por que melhora
- Reduz chance de bug por duplicacao de logica.
- Facilita evolucao do codigo para novas sequencias e validacoes.
- Deixa o comportamento do cubo mais facil de testar e demonstrar.
