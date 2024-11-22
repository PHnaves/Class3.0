import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/api.php'; // URL da sua API

  constructor(private http: HttpClient) {}

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      action: 'login',
      identifier, // pode ser o RA ou o email
      password
    });
  }
}