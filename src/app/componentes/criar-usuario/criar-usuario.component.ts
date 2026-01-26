import { Component } from '@angular/core';
import { FormularioUsuarioComponent } from "../formulario-usuario/formulario-usuario.component";
import { Usuario } from '../usuario/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-criar-usuario',
  imports: [FormularioUsuarioComponent],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css',
})
export class CriarUsuarioComponent {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ){}

  criarUsuario(novoUsuario: Usuario){
    this.usuarioService.adicionarUsuario(novoUsuario).subscribe(() => {
      this.router.navigate(['inicio'])
    })
  }

}
