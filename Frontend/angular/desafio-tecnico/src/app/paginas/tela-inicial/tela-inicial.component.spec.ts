import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaInicialComponent } from './tela-inicial.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ListaUsuariosComponent } from '../../componentes/lista-usuarios/lista-usuarios.component';
import { BarraPesquisaComponent } from '../../componentes/barra-pesquisa/barra-pesquisa.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ComponentFactory } from '@angular/core';

describe('TelaInicialComponent', () => {
  let component: TelaInicialComponent;
  let fixture: ComponentFixture<TelaInicialComponent>;
  let service: UsuarioService

  const usuarioServiceMock = {
    obterUsuarios: () => of([{ id: '1', nome: 'Mateus', email: 'mateus@test.com' }])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TelaInicialComponent,
        CabecalhoComponent,
        BarraPesquisaComponent, 
        ListaUsuariosComponent, 
        MatIconModule, 
        MatFormFieldModule, 
        MatButtonModule
      ],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceMock}, // isso substitui o real por um mock, pra n fazer realmente a http
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaInicialComponent);
    service = TestBed.inject(UsuarioService)
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('deve remover o usuário da lista local', ()=>{
    const listaLocal = [
      {id: '123', nome: 'matues', email: 'mateus@gmail'},
      {id: '456', nome: 'jorge', email: 'jorge@email'}
    ]

    component.listaUsuarios.set(listaLocal)

    component.removerUsuarioDaLista(listaLocal[0].id)

    expect(component.listaUsuarios().length).toBe(1)
    expect(component.listaUsuarios()).not.toContain(listaLocal[0])

  })

  it('deve buscar os usuários corretos na barra de pesquisa', ()=>{
    const listaLocal = [
      {id: '123', nome: 'mateus', email: 'mateus@gmail'},
      {id: '456', nome: 'jorge', email: 'jorge@yahhoo'},
      {id: '789', nome: 'mariana', email: 'jorge@examplo'}
    ]

    const obterServiceSpy = vi.spyOn(service, 'obterUsuarios').mockReturnValue(of(listaLocal)); //simular que trouxe isso

    component.buscarUsuario('ma')

    expect(component.listaUsuarios().length).toBe(2)
    expect(component.listaUsuarios()[0].nome).toBe('mateus')
    expect(obterServiceSpy).toHaveBeenCalled();

  })

  it('deve recarregar a lista completa se o termo de busca for vazio', () => {
    const spyNgOnInit = vi.spyOn(component, 'ngOnInit');
    
    component.buscarUsuario('   '); // Termo com espaços (será feito trim)
    
    expect(spyNgOnInit).toHaveBeenCalled();
  });


});
