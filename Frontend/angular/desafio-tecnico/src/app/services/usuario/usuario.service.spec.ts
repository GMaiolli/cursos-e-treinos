import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Usuario } from '../../componentes/usuario/usuario';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpMock: HttpTestingController;
  const API_URL = 'http://localhost:3000/usuarios'

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsuarioService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(UsuarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  //isso é pra garantir que nenhum requisição ficou pendurada de um teste para outro.
  afterEach(() => {
    httpMock.verify();
  });

  it('deveria ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deveria buscar uma lista de usuários (GET)', () => {
    const mockUsuarios: Usuario[] = [
      {id: '12321', nome: 'Mateus', email: 'mateus@test.com'},
      {id: '45654', nome: 'Ana', email: 'ana@test.com'}
    ]

    service.obterUsuarios().subscribe((usuarios) => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(mockUsuarios);
    })

    const req = httpMock.expectOne(API_URL)
    expect(req.request.method).toBe('GET')
    req.flush(mockUsuarios)

  })

  it('deveria criar um usuário corretamente (POST)', () => {
    const novoUsuario: Usuario = {id: '123', nome: 'Lucas', email: 'lucas@test.com'}

    // const mockUsuarios: Usuario[] = [
    //   {id: '12321', nome: 'Mateus', email: 'mateus@test.com'},
    //   {id: '45654', nome: 'Ana', email: 'ana@test.com'}
    // ]

    service.adicionarUsuario(novoUsuario).subscribe((res) => {
      expect(res).toEqual(novoUsuario)
    })

    const req = httpMock.expectOne(API_URL)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual(novoUsuario)
    req.flush(novoUsuario);
  })

  it('deveria editar um usuário corretamente (PUT)', () => {
    // const usuarioAnterior: Usuario = {id: 'abc', nome: 'Michael', email: 'michael@test.com'}

    const usuarioAlterado: Usuario = {id: 'def', nome: 'Ulisses', email: 'ulisses@gmail.com'}

    service.editarUsuario(usuarioAlterado).subscribe((res) => {
      expect(res).toEqual(usuarioAlterado);

    })

    const req = httpMock.expectOne(`${API_URL}/${usuarioAlterado.id}`)
    expect(req.request.method).toBe('PUT')
    req.flush(usuarioAlterado);
  })
  
  it('deveria deletar um usuário corretamente (DELETE)', () => {

    const idParaExcluir: string = '1';

    service.excluirUsuario(idParaExcluir).subscribe((res) => {
      expect(res).toBeNull(); //ou o que o seu serviço retornar no void

    })

    const req = httpMock.expectOne(`${API_URL}/${idParaExcluir}`)
    expect(req.request.method).toBe('DELETE')
    req.flush(null); //simular uma resposta 204 ou No Content
  })

  //fazer testes com mais de um (fazer um post, e garantir que está lá, depois com um get  )

});
