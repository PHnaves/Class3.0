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
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    console.log('E-mail:', this.email);
    console.log('Senha:', this.password);
    
    // Aqui você pode adicionar a lógica de autenticação
    // Por exemplo, chamar um serviço de autenticação

    // Para fins de demonstração, vamos navegar para a página inicial
    this.router.navigate(['/home']);
  }

  navegarParaRegistro() {
    // Navegar para a página de registro (você pode criar essa página)
    this.router.navigate(['/register']);
  }
}
