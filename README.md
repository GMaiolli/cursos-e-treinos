# 🚀 Programa de Treinamento Técnico

Este repositório foi criado para apoiar o **programa de treinamento de desenvolvedores**, permitindo que cada participante desenvolva projetos práticos em diferentes tecnologias.

O objetivo é aprender **na prática**, através de desafios progressivos, seguindo uma trilha de aprendizagem definida.

---

## 📁 Estrutura do Repositório

```
/
├── Backend/
│ ├── java/
│ └── dotnet/
│
├── Frontend/
│ ├── angular/
│ └── react/
│
└── README.md
```

Cada pasta possui um `README.md` próprio com orientações específicas da tecnologia.

---

## 🎯 Objetivos do Programa

- Desenvolver habilidades técnicas reais
- Simular o dia a dia de projetos profissionais
- Trabalhar versionamento com Git
- Aprender boas práticas de organização
- Evoluir gradualmente do básico ao avançado

## 👨‍💻 Como Funciona

- Cada desenvolvedor trabalhará **em sua própria branch**
- Os projetos devem ser criados dentro da pasta da tecnologia escolhida
- Cada desafio deve conter:
  - Código-fonte
  - README explicativo

## 🌿 Padrão de Branches

Cada desenvolvedor deve utilizar a sua própria branch.

## 🔧 Configuração Inicial do Git

### 1️⃣ Clonar o repositório

```bash
git clone https://db1global.visualstudio.com/DefaultCollection/Forma%C3%A7%C3%A3o%20DGS/_git/Forma%C3%A7%C3%A3o%20DGS
```

### 2️⃣ Ir para a sua branch

```bash
git checkout nome-da-sua-branch
```

### 3️⃣ Verificar a branch atual (Opcional)

```bash
git branch
```
A branch marcada com * é a que você está utilizando.

---

## 💾 Fluxo Básico de Git

### 📍 Verificar alterações

```bash
git status
```

### ➕ Adicionar arquivos

Adicionar tudo:
```bash
git add .
```

Ou arquivos específicos:
```bash
git add caminho/do/arquivo
```

### 📝 Criar commit
```bash
git commit -m "feat: cria desafio 01 - fundamentos"
```

### ⬆️ Enviar para o repositório remoto
```bash
git push origin nome-da-sua-branch
```

---

## 🚫 O que NÃO deve ser enviado

- node_modules
- target
- bin
- obj
- .idea
- .vscode
- Arquivos de build
- Senhas ou tokens

**Utilize sempre o .gitignore.**

---

## 📚 Materiais de Apoio

- https://git-scm.com/book/pt-br/v2
- https://learngitbranching.js.org/
- https://www.atlassian.com/git/tutorials