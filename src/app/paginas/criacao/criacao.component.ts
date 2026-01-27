import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { CriarUsuarioComponent } from '../../componentes/criar-usuario/criar-usuario.component';
import { MatIconModule } from '@angular/material/icon';
import { FormularioService } from '../../services/formulario/formulario.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-criacao',
  imports: [CabecalhoComponent,  CriarUsuarioComponent, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './criacao.component.html',
  styleUrl: './criacao.component.css',
})
export class CriacaoComponent {

  constructor(private formularioService: FormularioService){}


  retornarInicio(){
    this.formularioService.retornarInicio()
  }
}
