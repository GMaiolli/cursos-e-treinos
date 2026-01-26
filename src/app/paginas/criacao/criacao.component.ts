import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { BotaoVoltarComponent } from "../../componentes/botao-voltar/botao-voltar.component";
import { CriarUsuarioComponent } from '../../componentes/criar-usuario/criar-usuario.component';

@Component({
  selector: 'app-criacao',
  imports: [CabecalhoComponent, BotaoVoltarComponent, CriarUsuarioComponent],
  templateUrl: './criacao.component.html',
  styleUrl: './criacao.component.css',
})
export class CriacaoComponent {

  inicio:string = "inicio" 

}
