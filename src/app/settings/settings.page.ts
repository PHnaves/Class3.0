// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-settings',
//   templateUrl: './settings.page.html',
//   styleUrls: ['./settings.page.scss'],
// })
// export class SettingsPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  username: string = '';
  password: string = '';

  constructor(private toastController: ToastController, private router: Router) {}

  async saveSettings() {
    // Aqui você pode adicionar a lógica para salvar as configurações
    // Por exemplo, você pode armazenar os dados em um serviço ou localStorage
    const toast = await this.toastController.create({
      message: 'Configurações salvas com sucesso!',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  openFaq() {
    // Navega para a página de ajuda
    this.router.navigate(['/faq']);
  }

  openContato() {
    // Navega para a página de contato
    this.router.navigate(['/contato']);
  }
}
