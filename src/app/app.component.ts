import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Atividades', url: '/atividades', icon: 'list' },
    { title: 'Matérias', url: '/materias', icon: 'book' },
    { title: 'Calendário', url: '/calendario', icon: 'calendar' },
    { title: 'Notificações', url: '/notificacoes', icon: 'notifications' },
  ];

  public utilPages = [
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Configurações', url: '/settings', icon: 'settings' },
    { title: 'Contato', url: '/contato', icon: 'mail' },
    { title: 'FAQ', url: '/faq', icon: 'help-circle' },
  ];

  userName: string = 'Usuário Teste';
  userEmail: string = 'teste@teste.com';

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Inicialização básica
    });
  }
}
