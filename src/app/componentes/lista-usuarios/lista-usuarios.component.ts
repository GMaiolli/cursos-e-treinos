import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../usuario/usuario';
import { UsuarioComponent } from "../usuario/usuario.component";

@Component({
  selector: 'app-lista-usuarios',
  imports: [UsuarioComponent],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css',
})
export class ListaUsuariosComponent{
  listaUsuarios: Usuario[] = []

  constructor(private usuarioService: UsuarioService){

  }

  ngOnInit(){
    this.usuarioService.obterUsuarios().subscribe(res => {
      this.listaUsuarios = res
    })

  }

  removerUsuario(id:string){
    this.usuarioService.excluirUsuario(id).subscribe(() => {
      this.deletarUsuarioDaLista(id)
    })
  }

  deletarUsuarioDaLista(usuarioId: string){
    this.listaUsuarios = this.listaUsuarios.filter(usuario => usuario.id !== usuarioId);
  }
}
