import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  senha: string = '';
  role: 'professor' | 'aluno' = 'aluno';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onSubmit() {
    if (!this.email || !this.senha) {
      await this.showToast('Por favor, preencha todos os campos');
      return;
    }

    this.authService.login(this.email, this.senha).subscribe(
      async (response) => {
        if (response.status === 'success') {
          const user = response.user;
          
          // Verificar se o tipo de usuário selecionado corresponde ao cadastrado
          if (user.role !== this.role) {
            await this.showToast(`Tipo de usuário incorreto. Você é um ${user.role}`);
            return;
          }

          // Redirecionar com base no tipo de usuário
          if (user.role === 'professor') {
            this.router.navigate(['/criar-atividade']);
          } else {
            this.router.navigate(['/atividades']);
          }
        } else {
          await this.showToast(response.message || 'Erro ao fazer login');
        }
      },
      async (error) => {
        await this.showToast('Erro ao conectar ao servidor');
      }
    );
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
}
