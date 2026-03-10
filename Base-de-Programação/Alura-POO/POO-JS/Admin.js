import User from "./User.js";

class Admin extends User{
    constructor(nome, email, nascimento, role = "Admin", ativo = true){
        super(nome, email, nascimento, role, ativo);
    }

    criarCurso(nomeDoCurso, qtdVagas){
        return `Curso ${nomeDoCurso} criado com ${qtdVagas} vagas.`;
    }

}

const novoAdmin = new Admin("Pedro", "pedro@example.com", "15/03/2000");

console.log(novoAdmin);
console.log(novoAdmin.exibirInfos());
console.log(novoAdmin.criarCurso("JavaScript Avançado", 20));