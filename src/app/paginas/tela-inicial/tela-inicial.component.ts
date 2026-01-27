import { Component, OnInit, output } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { BarraPesquisaComponent } from "../../componentes/barra-pesquisa/barra-pesquisa.component";
import { Router } from '@angular/router';
import { ListaUsuariosComponent } from "../../componentes/lista-usuarios/lista-usuarios.component";
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../componentes/usuario/usuario';
import { BotaoPadronizadoComponent } from '../../componentes/botao-padronizado/botao-padronizado.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tela-inicial',
  imports: [CabecalhoComponent, BarraPesquisaComponent, ListaUsuariosComponent, BotaoPadronizadoComponent, MatIconModule],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css',
})
export class TelaInicialComponent implements OnInit{

  listaUsuarios: Usuario[] = []
  // listaUsuarios = output<Usuario[]>;
  constructor(private usuarioService: UsuarioService){

  }

  ngOnInit(){
    this.usuarioService.obterUsuarios().subscribe(res => {
      this.listaUsuarios = res
    })


  }

}
