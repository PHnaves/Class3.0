import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = {
    email: '',
    senha: ''
  };

  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    // Limpar dados do formulário quando a página for carregada
    this.loginData = {
      email: '',
      senha: ''
    };
    this.errorMessage = '';
    this.isLoading = false;
  }

  async onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await this.authService.login(this.loginData.email, this.loginData.senha).toPromise();
      
      if (response.status === 'success') {
        const toast = await this.toastController.create({
          message: 'Login realizado com sucesso!',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        await toast.present();
        
        // Redirecionar para a página principal
        this.router.navigate(['/home']);
      } else {
        this.errorMessage = response.message || 'Erro ao fazer login';
      }
    } catch (error) {
      console.error('Erro no login:', error);
      this.errorMessage = 'Erro ao conectar com o servidor. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  // Validação personalizada do formulário
  validateForm(form: NgForm): boolean {
    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        const control = form.controls[key];
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return false;
    }
    return true;
  }

  // Limpar mensagem de erro quando o usuário começa a digitar
  onInput() {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }

  // Método para lidar com o envio do formulário pelo teclado
  async onKeyPress(event: KeyboardEvent, form: NgForm) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.validateForm(form)) {
        await this.onSubmit();
      }
    }
  }
}
