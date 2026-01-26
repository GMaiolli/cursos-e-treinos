import { Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../usuario/usuario';
import { nanoid } from 'nanoid';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  imports: [FormsModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css',
})
export class FormularioUsuarioComponent implements OnInit, OnChanges{
  usuario = input<Usuario|null>(null);
  submitForm = output<Usuario>();

  if(usuario){
    atualizacao = true
  }

  nomeUsuario = "";
  emailUsuario = "";
  constructor(private usuarioService: UsuarioService){}


  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    const usuarioAtual = this.usuario()

    if(changes['usuario'] && usuarioAtual){ //fica bem melhor com um formulário reativo... alterar depois
      this.nomeUsuario = usuarioAtual.nome;
      this.emailUsuario = usuarioAtual.email;
    }
  }


  emitirUsuarioAtualizado(){

    novoUsuario: Usuario

    const novoUsuario= new Usuario(this.nomeUsuario, this.emailUsuario)

    this.submitForm.emit(novoUsuario)

  }
}
