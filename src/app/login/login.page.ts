// // import { Component, OnInit } from '@angular/core';

// // @Component({
// //   selector: 'app-login',
// //   templateUrl: './login.page.html',
// //   styleUrls: ['./login.page.scss'],
// // })
// // export class LoginPage implements OnInit {

// //   constructor() { }

// //   ngOnInit() {
// //   }

// // }

// import { Component } from '@angular/core';
// import { AuthService } from '../services/auth.service';
// import { NavController } from '@ionic/angular';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage {
//   username: string = '';
//   password: string = '';

//   constructor(private authService: AuthService, private navCtrl: NavController) {}

//   onLogin() {
//     this.authService.login(this.username, this.password).subscribe(response => {
//       if (response.success) {
//         // Salve o token ou informações do usuário
//         localStorage.setItem('token', response.token);
//         // Navegue para a página principal ou dashboard
//         this.navCtrl.navigateRoot('/home');
//       } else {
//         // Trate o erro de login
//         alert('Login falhou. Verifique suas credenciais.');
//       }
//     }, error => {
//       console.error('Erro ao fazer login', error);
//       alert('Erro ao fazer login. Tente novamente.');
//     });
//   }
// }

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  identifier: string = ''; // Pode ser o RA ou email
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.identifier, this.password).subscribe(response => {
      if (response.success) {
        console.log('Login bem-sucedido:', response.message);
        // Redirecionar ou armazenar token
      } else {
        console.error('Erro no login:', response.message);
      }
    });
  }
}
