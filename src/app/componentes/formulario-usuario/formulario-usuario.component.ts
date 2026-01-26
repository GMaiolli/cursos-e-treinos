import { Component, input, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Usuario } from '../usuario/usuario';
import { nanoid } from 'nanoid';
import { CampoTextoComponent } from "../campo-texto/campo-texto.component";
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  imports: [FormsModule, CampoTextoComponent],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css',
})
export class FormularioUsuarioComponent {
  submitForm = output<Usuario>()
  usuario = input<Usuario | null>(null)

  usuarioFormulario!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ){}

  ngOnInit() {
    this.inicializarUsuarioFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verificamos se o 'usuario' mudou e se ele não é nulo
    const usuarioAtual = this.usuario();
    
    if (changes['usuario'] && usuarioAtual) {
      // Sincronizamos os dados do input com as variáveis locais
      this.nomeUsuario = usuarioAtual.nome;
      this.emailUsuario = usuarioAtual.email;
    }
  }

  inicializarUsuarioFormulario() {
    this.usuarioFormulario = this.formBuilder.group({
      id: [''],
      nome: [''],
      email: ['']
    })
  };


  nomeUsuario = "";
  emailUsuario = "";
  emitirUsuarioAtualizado(){

    novoUsuario: Usuario

    const novoUsuario= new Usuario(this.nomeUsuario, this.emailUsuario)

    this.submitForm.emit(novoUsuario)

  }
}
