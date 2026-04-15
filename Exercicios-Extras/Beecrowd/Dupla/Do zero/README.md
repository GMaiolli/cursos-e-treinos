# Relatório Técnico: O Problema das Festas em São Petersburgo

## Análise de Subgrafos Induzidos e Processamento em Fila (FIFO)

---

## 1. O Desafio: Maximizar Convidados sob Restrição de Grau

O problema central consiste em encontrar o maior conjunto de pessoas onde cada integrante possui, no mínimo, $K$ amigos também presentes no conjunto.

**Input:**
- Um grafo não direcionado (pessoas e amizades)  
- Um inteiro $K$

**Restrição:**
- Condição de permanência: $Grau(v) \ge K$

**Objetivo:**
- Identificar o subgrafo máximo que satisfaça essa condição

---

## 2. Modelagem e Lógica Visual

Durante a fase de planejamento, a solução foi desenhada visualmente para compreender o comportamento dos nós que não atingiam o requisito.

### Estratégia de Identificação

A lógica baseia-se em um processo iterativo:
- Se uma pessoa possui menos de $K$ amigos, ela é removida  
- A remoção impacta diretamente os vizinhos, reduzindo seus graus  

---

### Efeito Cascata (Visualização)

Simulações visuais (como em desenho no Paint) ajudam a entender o comportamento:

- A remoção de um "nó fraco" gera um **efeito dominó**
- Vizinhos perdem conexões
- Alguns passam a violar a condição $Grau(v) \ge K$
- Esses também precisam ser removidos

---

### Uso de Fila (FIFO)

Para gerenciar esse processo de forma eficiente:

- Utiliza-se uma **fila (FIFO)**
- Todo nó com grau abaixo de $K$ é inserido na fila
- A fila garante processamento ordenado das remoções
- Nenhum nó inválido permanece no resultado final

---

## 3. Implementação Técnica

A solução utiliza uma variação de **Busca em Largura (BFS)** aplicada à remoção iterativa de nós.

### Componentes Chave

#### Lista de Adjacência e Vetor de Graus
- Representação do grafo
- Contagem inicial de conexões de cada nó

---

#### Mecanismo de Poda (Pruning)

1. Inicialização:
   - Inserir na fila todos os nós com `grau[i] < K`

2. Processamento:
   - Enquanto a fila não estiver vazia:
     - Remover um nó
     - Decrementar o grau de seus vizinhos ativos
     - Se algum vizinho cair abaixo de $K$, adicioná-lo à fila

---

#### Saída Ordenada

- Ao final:
  - Selecionar nós com `grau[i] \ge K`
  - Converter para string
  - Ordenar em ordem crescente
  - Exibir resultado

---

### Análise de Performance

**Complexidade de Tempo:**
$$
O(N + M)
$$
- $N$: número de pessoas  
- $M$: número de amizades  
- Cada nó e aresta é processado no máximo uma vez  

**Complexidade de Espaço:**
$$
O(N + M)
$$
- Armazenamento do grafo e estruturas auxiliares  

---

## 4. Diferenciais da Solução Coletiva

### Eficiência de IO

- Uso de:
  - `sys.stdin`
  - gerador de tokens
  - `sys.stdout.write`

**Motivação:**
- Evitar overhead de `input()` e `print()`
- Atender limites rigorosos de juízes online (ex: Beecrowd)

---

### Robustez

- Trata corretamente casos extremos:
  - Quando todos os nós são removidos
  - Saída correta: `0`

- Demonstra atenção aos casos de borda discutidos na fase de modelagem

---

## 5. Conclusão

A etapa de modelagem visual foi determinante para compreender que o problema envolve não apenas remoções simples, mas um processo de **exclusão em cascata**.

A implementação final demonstra:

- Clareza lógica  
- Eficiência computacional  
- Boa adaptação a ambientes competitivos  

O resultado é uma solução elegante, robusta e com desempenho adequado para grandes volumes de dados.