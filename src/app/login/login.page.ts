// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Usuário:', this.username);
    console.log('Senha:', this.password);

    // Exemplo de autenticação simples (substitua por lógica real)
    if (this.username === 'admin' && this.password === 'admin') {
      // Redirecionar para a página inicial após o login bem-sucedido
      this.router.navigate(['/home']);
    } else {
      // Exibir mensagem de erro ou feedback ao usuário
      alert('Usuário ou senha incorretos');
    }
  }
}
