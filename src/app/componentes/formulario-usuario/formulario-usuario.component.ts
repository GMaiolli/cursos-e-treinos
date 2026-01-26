import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuario',
  imports: [FormsModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css',
})
export class FormularioUsuarioComponent {
  
  nomeUsuario = "";
  emailUsuario = "";
  aoSubmeter(){
    console.log(this.nomeUsuario);
    console.log(this.emailUsuario);
    this.nomeUsuario = "";
    this.emailUsuario = "";
  }
}
