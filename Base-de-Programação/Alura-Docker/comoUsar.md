# Instruções de Uso - Docker

### Inicialização
Certifique-se de que o serviço do Docker está ativo:
```bash
sudo service docker start
```

### Build e Execução
Verifique que está na pasta que o Dockerfile está (use cd para ir até ela pelo terminal)
Contruir a imagem (Build):
```bash
docker build -t meu-projeto-python .
```
Caso tenha compose para fazer varias imagens:
```bash
docker compose up --build -d
```
Executar o container:
```bash
docker run -it --name execucao-teste meu-projeto-python
```

### Gerenciamento de Containers
Listar containers ativos:
```bash
docker ps
```
Listar todos os containers (incluindo parados):
```bash
docker ps -a
```
Parar um container:
```bash
docker stop [NOME_OU_ID]
```
Excluir um container:
```bash
docker rm [NOME_OU_ID]
```

### Gerenciamento de Imagens
Listar imagens locais:
```bash
docker images
```
Excluir uma imagem:
```bash
docker rmi [NOME_DA_IMAGEM]
```

### Manutenção e Limpeza
Remover containers parados e recursos não utilizados:
```bash
docker system prune
```