import User from "./User.js";

export default class Admin extends User{
    constructor(nome, email, nascimento, role = "Admin", ativo = true){
        super(nome, email, nascimento, role, ativo);
    }

    // exibirInfos(){
    //     const info = super.exibirInfos();
    //     return `${info}, cargo: ${this.role}`;
    // }

    criarCurso(nomeDoCurso, qtdVagas){
        return `Curso ${nomeDoCurso} criado com ${qtdVagas} vagas.`;
    }
}

// const novoAdmin = new Admin("Pedro", "pedro@example.com", "15/03/2000");

// console.log(novoAdmin);
// console.log(novoAdmin.exibirInfos());
// console.log(novoAdmin.criarCurso("JavaScript Avançado", 20));