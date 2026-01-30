import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioComponent } from './usuario.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BotaoPadronizadoComponent } from '../botao-padronizado/botao-padronizado.component';
import { provideRouter } from '@angular/router';
import { Usuario } from './usuario';

import { jest } from '@jest/globals';

describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsuarioComponent,
        CommonModule,
        MatIconModule,
        BotaoPadronizadoComponent
      ],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    // await fixture.whenStable();
  });

  it('should create', () => {

    const usuarioExemplo: Usuario = {
      id: '4ferfrfr',
      nome: 'NomeDoUsuario',
      email: 'email@db1.com.br'
    }

    fixture.componentRef.setInput('usuario', usuarioExemplo)

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  
  it('deveria emitir o id do usuário através do output excluirUsuario quando o método excluir for chamado', ()=> {
    let idRecebido: string | undefined

    const usuarioExcluido: Usuario = {id: 'abcd', nome: 'nomeExemplo', email: 'email@example'}

    fixture.componentRef.setInput('usuario', usuarioExcluido)

    component.excluirUsuario.subscribe(val => idRecebido = val); //guarde o val, quando o evento ocorrer, passar esse valor de val para o idRecebido
  
    component.excluir();

    expect(idRecebido).toBe('abcd');


    //antes ela usou o jest, mas aqui não está deixando! não consegui arrumar, usei o subscribe mesmo
    // jest.spyOn(component.excluirUsuario as any, 'emit');
    
    // component.excluir()

    // expect(component.excluirUsuario.emit).toHaveBeenCalledWith( idExemplo)


  });

//   export class UsuarioComponent {

//   usuario = input.required<Usuario>();
//   excluirUsuario = output<string>();

//   excluir(){
//     this.excluirUsuario.emit(this.usuario().id)
//   }

// }


});
