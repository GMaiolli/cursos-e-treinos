import { Component } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { BarraPesquisaComponent } from "../../componentes/barra-pesquisa/barra-pesquisa.component";
import { Router } from '@angular/router';
import { BotaoComponent } from "../../componentes/botao/botao.component";

@Component({
  selector: 'app-tela-inicial',
  imports: [CabecalhoComponent, BarraPesquisaComponent, BotaoComponent],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css',
})
export class TelaInicialComponent {

}
