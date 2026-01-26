import { Component, OnInit, output } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { BarraPesquisaComponent } from "../../componentes/barra-pesquisa/barra-pesquisa.component";
import { Router } from '@angular/router';
import { BotaoComponent } from "../../componentes/botao/botao.component";
import { ListaUsuariosComponent } from "../../componentes/lista-usuarios/lista-usuarios.component";
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../componentes/usuario/usuario';
import { BotaoPadronizadoComponent } from '../../componentes/botao-padronizado/botao-padronizado.component';

@Component({
  selector: 'app-tela-inicial',
  imports: [CabecalhoComponent, BarraPesquisaComponent, BotaoComponent, ListaUsuariosComponent, BotaoPadronizadoComponent],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css',
})
export class TelaInicialComponent implements OnInit{

  listaUsuarios: Usuario[] = []

  constructor(private usuarioService: UsuarioService){

  }

  ngOnInit(){
    this.usuarioService.obterUsuarios().subscribe(res => {
      this.listaUsuarios = res
    })


  }

}
