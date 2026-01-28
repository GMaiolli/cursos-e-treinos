import { ChangeDetectorRef, Component, input, OnInit, output } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../usuario/usuario';
import { UsuarioComponent } from "../usuario/usuario.component";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-lista-usuarios',
  imports: [UsuarioComponent, MatDividerModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css',
})
export class ListaUsuariosComponent{
  listaUsuarios= input<Usuario[]>()

  usuarioExcluido = output<string>();

  constructor(private usuarioService: UsuarioService, private cdr: ChangeDetectorRef){

  }

  // ngOnInit(){
  //   this.usuarioService.obterUsuarios().subscribe(res => {
  //     this.listaUsuarios = res;
  //     this.cdr.detectChanges(); //foi a solução encontrada.
  //   })

  // }

  removerUsuario(id:string){
    this.usuarioService.excluirUsuario(id).subscribe(() => {
      // this.deletarUsuarioDaLista(id)
      this.usuarioExcluido.emit(id)
    })
  }

  // deletarUsuarioDaLista(usuarioId: string){
  //   this.listaUsuarios = this.listaUsuarios.filter(usuario => usuario.id !== usuarioId);
  // }
}
