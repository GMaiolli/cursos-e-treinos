import { Component, OnInit } from '@angular/core';
import { FormularioUsuarioComponent } from "../../componentes/formulario-usuario/formulario-usuario.component";
import { Usuario } from '../../componentes/usuario/usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormularioService } from '../../services/formulario/formulario.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-editar-usuario',
  imports: [FormularioUsuarioComponent, CabecalhoComponent, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css',
})
export class EditarUsuarioComponent implements OnInit{
  usuario!: Usuario;
  inicio:string = "inicio" 

  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formularioService: FormularioService
    // private cdr: ChangeDetectorRef
  ){
    const navegacao = this.router.getCurrentNavigation();
    this.usuario = navegacao?.extras.state?.['usuario'];
    console.log(this.usuario)
  }

  ngOnInit(){

    // const id = this.activatedRoute.snapshot.paramMap.get("id");

    // if(id){
    //   this.usuarioService.obterUsuarioPorId(id).subscribe((usuario) =>
    //   {
    //     this.usuario = usuario;
    //     // this.cdr.detectChanges();
    //   })
    // }
  }

  editarUsuario(usuario: Usuario){
    this.usuarioService.editarUsuario(usuario).subscribe(() => {
      this.router.navigate(['/inicio'])
    })
  }

  retornarInicio(){
    this.formularioService.retornarInicio()
  }
}