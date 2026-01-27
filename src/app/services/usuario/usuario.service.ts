import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../componentes/usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private API_URL= "http://localhost:3000/usuarios"
  
  constructor(private httpClient: HttpClient){}

  obterUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.API_URL)
  }

  obterUsuarioPorId(id:string): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.API_URL}/${id}`)
  }

  obterUsuariosPorNome(params:HttpParams): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.API_URL}/`, { params })
  }


  adicionarUsuario(novoUsuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.API_URL, novoUsuario)
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.API_URL}/${usuario.id}`, usuario)
  }

  excluirUsuario(id:string): Observable<void>{
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`)
  }
}
