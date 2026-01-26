import { nanoid } from "nanoid";
//isso aqui poderia ser colocado dentro de uma pasta "modelos"
export class Usuario {
    readonly id: string = nanoid()

    constructor(
        public nome: string,
        public email: string 
    ){}

}