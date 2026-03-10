import User from "./User.js";

class Docente extends User{
    constructor(nome, email, nascimento, role = "Docente", ativo = true){
        super(nome, email, nascimento, role, ativo);
    }

    aprovarEstudante(nomeDoEstudante, curso){
        return `O estudante ${nomeDoEstudante} foi aprovado no curso ${curso}, responsável: ${this.nome}.`;
    }

}

const novoDocente = new Docente("Maria", "maria@example.com", "20/05/1990");
console.log(novoDocente);
console.log(novoDocente.exibirInfos());
console.log(novoDocente.aprovarEstudante("João", "JavaScript Avançado"));