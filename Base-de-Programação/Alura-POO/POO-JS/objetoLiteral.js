const user = {
    nome: "Gabriel",
    email: "gabriel@example.com",
    nascimento: "2006-02-10",
    role: "estudante",
    ativo: true,
    exibirInfos: function() {
        console.log(this.nome, this.email);
    },
};

// user.exibirInfos()

// const exibir = user.exibirInfos
// exibir() 

const exibir = function() {
    console.log(this.nome, this.email);
}

const exibirNome = exibir.bind(user)
exibirNome()