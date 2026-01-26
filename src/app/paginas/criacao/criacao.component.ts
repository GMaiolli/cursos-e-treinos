import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { FormularioUsuarioComponent } from "../../componentes/formulario-usuario/formulario-usuario.component";
import { BotaoVoltarComponent } from "../../componentes/botao-voltar/botao-voltar.component";

@Component({
  selector: 'app-criacao',
  imports: [CabecalhoComponent, FormularioUsuarioComponent, BotaoVoltarComponent],
  templateUrl: './criacao.component.html',
  styleUrl: './criacao.component.css',
})
export class CriacaoComponent {

  inicio:string = "inicio" 

}
