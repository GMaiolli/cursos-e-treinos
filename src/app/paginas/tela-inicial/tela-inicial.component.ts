import { Component, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { BarraPesquisaComponent } from "../../componentes/barra-pesquisa/barra-pesquisa.component";
import { Router } from '@angular/router';
import { ListaUsuariosComponent } from "../../componentes/lista-usuarios/lista-usuarios.component";
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../componentes/usuario/usuario';
import { BotaoPadronizadoComponent } from '../../componentes/botao-padronizado/botao-padronizado.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tela-inicial',
  imports: [CabecalhoComponent, BarraPesquisaComponent, ListaUsuariosComponent, BotaoPadronizadoComponent, MatIconModule, MatFormFieldModule],
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

  buscarUsuario(nome: string){
    if(!nome.trim()) return; //vai buscar nada se estiver vazio

    const params = new HttpParams().set('nome', nome)

    this.usuarioService.obterUsuariosPorNome(params).subscribe({
      next: (usuariosFiltrados) => {
        this.listaUsuarios = usuariosFiltrados;
      }
    })
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //     if (changes['usuario'] && this.usuario()) {
  //       this.usuarioFormulario.patchValue({
  //         nome: this.usuario()!.nome,
  //         email: this.usuario()!.email
  //       });
  //       // this.cdr.detectChanges();
  //     }
  //   }
  // ngOnChanges(changes:SimpleChanges){
  //   if
  // }

}
