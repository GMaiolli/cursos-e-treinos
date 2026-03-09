import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUsuarioComponent } from './formulario-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampoTextoComponent } from './campo-texto/campo-texto.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Usuario } from '../usuario/usuario';

describe('FormularioUsuarioComponent', () => {
  let component: FormularioUsuarioComponent;
  let fixture: ComponentFixture<FormularioUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioUsuarioComponent, FormsModule, CampoTextoComponent, CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatTooltipModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioUsuarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('deveria inicializar o formulário com valores vazios, se ele vier sem usuário', () => {
    if (!component.usuario()){
      expect(component.usuarioFormulario.value).toEqual({
        nome: '',
        email: ''
      });
    }
  });

  it('deveria inicializar o formulário com valores do usuário, se ele vier com usuário', () => {
    if (component.usuario()){
      expect(component.usuarioFormulario.value).toEqual({
        nome: component.usuario()?.nome,
        email: component.usuario()?.email
      });
    }
  });

  it('deveria emitir o formulário com os dados corretos ao chamar emitirUsuarioAtualizado', () =>   {
    const dadosFormulario = {
      nome: 'mateus',
      email: 'mateus@test.com.br'
    }

    let usuarioEmitido: Usuario | undefined;

    // const emitirLivroAtualizadoSpy = jest.spyOn()

    component.usuarioFormulario.setValue(dadosFormulario);
    component.submitForm.subscribe(val => usuarioEmitido = val)

    component.emitirUsuarioAtualizado()

    expect(usuarioEmitido).toBeDefined()
    expect(usuarioEmitido?.nome).toBe(dadosFormulario.nome)
    expect(usuarioEmitido?.email).toBe(dadosFormulario.email)

  })

  it('não deve emitir o formulário se o email for inválido', () => {
    const dadosFormulario = {
      nome: 'mateus',
      email: 'email-invalido'
    }

    let foiEmitido = false

    component.usuarioFormulario.setValue(dadosFormulario)
    component.submitForm.subscribe(() => foiEmitido = true) //não é para o foiEmitido ficar true, vai ficar só se o submitForm for emitido.

    component.emitirUsuarioAtualizado()

    expect(component.usuarioFormulario.invalid).toBe(true)
    expect(foiEmitido).toBe(false)

  })

  it('não deve emitir o formulário se o nome for inválido', () => {
    const dadosFormulario = {
      nome: '',
      email: 'email@db1.com'
    }

    let foiEmitido = false

    component.usuarioFormulario.setValue(dadosFormulario)
    component.submitForm.subscribe(() => foiEmitido = true) //não é para o foiEmitido ficar true, vai ficar só se o submitForm for emitido.

    component.emitirUsuarioAtualizado()

    expect(component.usuarioFormulario.invalid).toBe(true)
    expect(foiEmitido).toBe(false)

  })

  it('deve gerar os botões de cancelar e de concluir', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button.botao-cancelar').textContent).toEqual('Cancelar');
    expect(compiled.querySelector('button.botao-concluir').textContent).toEqual('Concluir');

  })





});
