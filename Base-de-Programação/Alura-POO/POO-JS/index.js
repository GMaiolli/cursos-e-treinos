import User from "./User.js";
import Admin from "./Admin.js";
import Docente from "./Docente.js";

const novoUser = new User("Mariana", "mariana@example.com", "10/10/1995");
console.log(novoUser.exibirInfos());

// const novoAdmin = new Admin("Pedro", "pedro@example.com", "15/03/2000");
// console.log(novoAdmin.exibirInfos());

// const novoDocente = new Docente("Maria", "maria@example.com", "20/05/1980");
// console.log(novoDocente.exibirInfos());

const dadosFicticios = User.exibirInfosGenericas("Carlos", "carlos@example.com");
console.log(dadosFicticios);