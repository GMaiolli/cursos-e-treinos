import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../usuario/usuario';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-formulario-usuario',
  imports: [FormsModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css',
})
export class FormularioUsuarioComponent {
  submitForm = output<Usuario>()


  nomeUsuario = "";
  emailUsuario = "";
  emitirUsuarioAtualizado(){

    novoUsuario: Usuario

    const novoUsuario= new Usuario(this.nomeUsuario, this.emailUsuario)

    this.submitForm.emit(novoUsuario)

  }
}
