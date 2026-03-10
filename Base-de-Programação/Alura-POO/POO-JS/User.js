export default class User{
    constructor(nome, email, nascimento, role, ativo = true){
        this.nome = nome;
        this.email = email;
        this.nascimento = nascimento;
        this.role = role || "estudante";
        this.ativo = ativo;
    }

    exibirInfos(){
        return `${this.nome}, ${this.email}, ${this.nascimento}, ${this.role}, ${this.ativo}`;
    }
}

const novoUser = new User("Gabriel", "gabriel@example.com", "10/02/2006");
// console.log(novoUser);
// console.log(novoUser.exibirInfos());

// console.log(User.prototype.isPrototypeOf(novoUser));