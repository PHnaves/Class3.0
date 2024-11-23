// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {

//   constructor() {}

// }

import { Component, OnInit } from '@angular/core';
import { AtividadeService } from '../atividade.service'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  contagemAtividades: number = 0; // Inicializa com 0
  contagemMaterias: number = 0; // Inicializa com 0
  atividadesRecentes: any[] = []; // Inicializa como array vazio
  contagemNotificacoes: number = 0; // Inicializa com 0

  constructor(private atividadeService: AtividadeService) {}

  ngOnInit() {
    this.contagemAtividades = this.atividadeService.getContagemAtividades();
    this.contagemMaterias = this.atividadeService.getContagemMaterias();
    this.atividadesRecentes = this.atividadeService.getAtividadesRecentes();
    this.contagemNotificacoes = this.atividadeService.getNotificacoes();
  }
}
