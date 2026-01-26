import { Component, OnInit } from '@angular/core';
import { FormularioUsuarioComponent } from "../../componentes/formulario-usuario/formulario-usuario.component";
import { Usuario } from '../../componentes/usuario/usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { BotaoVoltarComponent } from '../../componentes/botao-voltar/botao-voltar.component';

@Component({
  selector: 'app-editar-usuario',
  imports: [FormularioUsuarioComponent, CabecalhoComponent, BotaoVoltarComponent],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css',
})
export class EditarUsuarioComponent implements OnInit{
  usuario!: Usuario;
  inicio:string = "inicio" 

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(){
    const id = this.activatedRoute.snapshot.paramMap.get("id");

    if(id){
      this.usuarioService.obterUsuarioPorId(id).subscribe((usuario) =>
      {
        this.usuario = usuario
      })
    }
  }

  editarUsuario(usuario: Usuario){
    this.usuarioService.editarUsuario(usuario).subscribe(() => {
      this.router.navigate(['/inicio'])
    })
  }
}