// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-contato',
//   templateUrl: './contato.page.html',
//   styleUrls: ['./contato.page.scss'],
// })
// export class ContatoPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage {
  nome: string = '';
  email: string = '';
  mensagem: string = '';

  constructor(private toastController: ToastController) {}

  async enviarContato() {
    // Aqui você pode adicionar a lógica para enviar a mensagem
    const toast = await this.toastController.create({
      message: 'Mensagem enviada com sucesso!',
      duration: 2000,
      color: 'success'
    });
    toast.present();
    // Limpar os campos após o envio
    this.nome = '';
    this.email = '';
    this.mensagem = '';
  }
}