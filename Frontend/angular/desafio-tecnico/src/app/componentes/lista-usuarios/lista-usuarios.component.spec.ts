import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuariosComponent } from './lista-usuarios.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { MatDividerModule } from '@angular/material/divider';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { of } from 'rxjs';

describe('ListaUsuariosComponent', () => {
  let component: ListaUsuariosComponent;
  let fixture: ComponentFixture<ListaUsuariosComponent>;
  let service: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListaUsuariosComponent,
        UsuarioComponent,
        MatDividerModule
      ]
    })
    .compileComponents();

    service = TestBed.inject(UsuarioService)
    fixture = TestBed.createComponent(ListaUsuariosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve gerar os span de nome e email', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span.coluna-nome').textContent).toEqual('Nome');
    expect(compiled.querySelector('span.coluna-email').textContent).toEqual('E-mail');

  });

  it('deve emitir a remoção de um usuário pelo método removerUsuario', ()=>{
    const idParaRemover = 'ABCD';

    let idCapturadoNoOutput = '';
                                                                  //o of faz o subscribe ser executado instantaneamente
    const excluirServiceSpy = vi.spyOn(service, 'excluirUsuario').mockReturnValue(of(undefined)); //finge que o servidor respondeu, só pra continuar
                                                                //nesse está precisando
    component.usuarioExcluido.subscribe(id => idCapturadoNoOutput = id );

    component.removerUsuario(idParaRemover);

    expect(excluirServiceSpy).toHaveBeenCalledWith(idParaRemover);

    expect(idCapturadoNoOutput).toBe(idParaRemover);

  });

  // it('deveria emitir o formulário com os dados corretos ao chamar emitirUsuarioAtualizado', () =>   {
  //     const dadosFormulario = {
  //       nome: 'mateus',
  //       email: 'mateus@test.com.br'
  //     }
  
  //     let usuarioEmitido: Usuario | undefined;
  
  //     // const emitirLivroAtualizadoSpy = jest.spyOn()
  
  //     component.usuarioFormulario.setValue(dadosFormulario);
  //     component.submitForm.subscribe(val => usuarioEmitido = val)
  
  //     component.emitirUsuarioAtualizado()
  
  //     expect(usuarioEmitido).toBeDefined()
  //     expect(usuarioEmitido?.nome).toBe(dadosFormulario.nome)
  //     expect(usuarioEmitido?.email).toBe(dadosFormulario.email)
  
  //   })


});
