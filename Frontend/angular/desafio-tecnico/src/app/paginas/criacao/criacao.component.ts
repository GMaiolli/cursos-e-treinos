import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { MatIconModule } from '@angular/material/icon';
import { FormularioService } from '../../services/formulario/formulario.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Usuario } from '../../componentes/usuario/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormularioUsuarioComponent } from '../../componentes/formulario-usuario/formulario-usuario.component';

@Component({
  selector: 'app-criacao',
  imports: [CabecalhoComponent, MatIconModule, MatButtonModule, MatTooltipModule, FormularioUsuarioComponent],
  templateUrl: './criacao.component.html',
  styleUrl: './criacao.component.css',
})
export class CriacaoComponent {

  constructor(
    private formularioService: FormularioService,
    private usuarioService: UsuarioService,
    private router: Router
  ){}

  criarUsuario(novoUsuario: Usuario){
    this.usuarioService.adicionarUsuario(novoUsuario).subscribe(() => {
      this.router.navigate(['/inicio'])
    })
  }

  retornarInicio(){
    this.formularioService.retornarInicio()
  }
}
