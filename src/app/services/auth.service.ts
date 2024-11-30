import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: number;
  nome: string;
  email: string;
  role: 'professor' | 'aluno';
  foto_perfil?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  // Mock users for testing
  private mockUsers: User[] = [
    {
      id: 1,
      nome: 'Professor Demo',
      email: 'professor@demo.com',
      role: 'professor'
    },
    {
      id: 2,
      nome: 'Aluno Demo',
      email: 'aluno@demo.com',
      role: 'aluno'
    }
  ];

  constructor(private router: Router) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, senha: string): Observable<any> {
    // Mock authentication
    const user = this.mockUsers.find(u => u.email === email);
    
    if (user && senha === '123456') { // Mock password check
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of({ status: 'success', user });
    }
    
    return of({ status: 'error', message: 'Credenciais inválidas' });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(userData: {nome: string, email: string, senha: string, role: 'professor' | 'aluno'}): Observable<any> {
    const newUser: User = {
      id: this.mockUsers.length + 1,
      nome: userData.nome,
      email: userData.email,
      role: userData.role
    };
    
    this.mockUsers.push(newUser);
    return of({ status: 'success', user: newUser });
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isProfessor(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'professor';
  }

  isAluno(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'aluno';
  }
}
