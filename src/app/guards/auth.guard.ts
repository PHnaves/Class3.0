import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Mostrar mensagem de erro
    const toast = await this.toastController.create({
      message: 'Você precisa fazer login para acessar esta página',
      duration: 3000,
      position: 'top',
      color: 'warning'
    });
    await toast.present();

    // Redirecionar para login e salvar a URL que o usuário tentou acessar
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    
    return false;
  }
}
