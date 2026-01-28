import { Component, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { BarraPesquisaComponent } from "../../componentes/barra-pesquisa/barra-pesquisa.component";
import { ListaUsuariosComponent } from "../../componentes/lista-usuarios/lista-usuarios.component";
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../componentes/usuario/usuario';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpParams } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FormularioService } from '../../services/formulario/formulario.service';

@Component({
  selector: 'app-tela-inicial',
  imports: [
    CabecalhoComponent,
    BarraPesquisaComponent, 
    ListaUsuariosComponent, 
    MatIconModule, 
    MatFormFieldModule, 
    MatButtonModule
  ],
  templateUrl: './tela-inicial.component.html',
  styleUrl: './tela-inicial.component.css',
})
export class TelaInicialComponent implements OnInit{

  // listaUsuarios: Usuario[] = []
  listaUsuarios = signal<Usuario[]>([]);
  usuarioExcluido = input<string>();
  constructor(
    private usuarioService: UsuarioService,
    private formularioService: FormularioService

  ){

  }

  ngOnInit(){
    this.usuarioService.obterUsuarios().subscribe(res => {
      this.listaUsuarios.set(res)
    })
  }

  navegarNovoUsuario(){
    this.formularioService.navegarNovoUsuario()
  }

  buscarUsuario(nome: string){
    if(!nome.trim()) {
        this.ngOnInit();  
        return ; //vai buscar nada se estiver vazio
    }

    const params = new HttpParams().set('nome', nome)

    this.usuarioService.obterUsuariosPorNome(params).subscribe({
      next: (usuariosFiltrados) => {
        this.listaUsuarios.set(usuariosFiltrados);
      }
    })
  }

  removerUsuarioDaLista(usuarioId: string){
    this.listaUsuarios.update(lista => lista.filter(u => u.id !== usuarioId))

    // this.listaUsuarios = this.listaUsuarios.filter(usuario => usuario.id !== usuarioId);
  }

  //esse trecho abaixo não está sendo mais usado aqui
  

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
