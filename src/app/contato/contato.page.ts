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
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage {
  nome: string = '';
  email: string = '';
  mensagem: string = '';

  enviarContato() {
    if (this.nome && this.email && this.mensagem) {
      const serviceID = 'service_c1xqiat'; // Substitua pelo ID do serviço EmailJS
      const templateID = 'template_u7kmfcv'; // Substitua pelo ID do template EmailJS
      const userID = 'QNCV_45WdYdKFMT0E'; // Substitua pelo ID do usuário EmailJS

      const templateParams = {
        nome: this.nome,
        email: this.email,
        mensagem: this.mensagem,
      };

      emailjs
        .send(serviceID, templateID, templateParams, userID)
        .then(
          (response) => {
            console.log('E-mail enviado com sucesso!', response.status, response.text);
            alert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
          },
          (error) => {
            console.error('Erro ao enviar o e-mail:', error);
            alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.');
          }
        );
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}
