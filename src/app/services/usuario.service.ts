import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8100/usuarios'; // URL do seu backend para usuários

  constructor(private http: HttpClient) {}

  // Método para obter todos os usuários
  obterUsuarios(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Método para adicionar um novo usuário
  adicionarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.baseUrl, usuario);
  }
}