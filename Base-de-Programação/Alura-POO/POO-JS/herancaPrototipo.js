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

const admin = {
    nome: "Admin",
    email: "admin@example.com",
    nascimento: "2000-01-01",
    role: "admin",
    ativo: true,
    criarCurso: function() {
        console.log("Curso criado!");
    }
}

Object.setPrototypeOf(admin, user)
admin.criarCurso()
admin.exibirInfos()