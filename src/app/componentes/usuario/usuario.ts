import { nanoid } from "nanoid";
//isso aqui poderia ser colocado dentro de uma pasta "modelos"
export class Usuario {
    readonly id: string;

    constructor(
        public nome: string,
        public email: string,
        id?: string
    ){
        this.id = id || nanoid();
    }

}