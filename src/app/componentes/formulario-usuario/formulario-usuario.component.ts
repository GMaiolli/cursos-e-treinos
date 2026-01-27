import { ChangeDetectorRef, Component, input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../usuario/usuario';
import { nanoid } from 'nanoid';
import { CampoTextoComponent } from "../campo-texto/campo-texto.component";
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormularioService } from '../../services/formulario/formulario.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-formulario-usuario',
  imports: [FormsModule, CampoTextoComponent, CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.css',
})
export class FormularioUsuarioComponent implements OnInit, OnChanges {
  submitForm = output<Usuario>()
  usuario = input<Usuario | null>(null)

  usuarioFormulario!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private formularioService: FormularioService
  ){}

  ngOnInit() {
    this.inicializarUsuarioFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && this.usuario()) {
      this.usuarioFormulario.patchValue({
        nome: this.usuario()!.nome,
        email: this.usuario()!.email
      });
      // this.cdr.detectChanges();
    }
  }

  inicializarUsuarioFormulario() {
    this.usuarioFormulario = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  };


  emitirUsuarioAtualizado(){
    const formValue = this.usuarioFormulario.value;
    const existing = this.usuario();
    if (existing) {
      const updated = new Usuario(formValue.nome, formValue.email, existing.id);
      this.submitForm.emit(updated);
    } else {
      const novo = new Usuario(formValue.nome, formValue.email);
      this.submitForm.emit(novo);
    }
  }

  retornarInicio(){
    this.formularioService.retornarInicio();

  }
}
