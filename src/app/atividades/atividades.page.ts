// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-atividades',
//   templateUrl: './atividades.page.html',
//   styleUrls: ['./atividades.page.scss'],
// })
// export class AtividadesPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AtividadeService } from '../atividade.service'; // Ajuste o caminho conforme necessário

// interface Atividade {
//   descricao: string;
//   dataEntrega: string;
//   nota: number;
//   materia: string;
// }

// @Component({
//   selector: 'app-atividades',
//   templateUrl: './atividades.page.html',
//   styleUrls: ['./atividades.page.scss'],
// })
// export class AtividadesPage implements OnInit {
//   atividades: Atividade[] = []; // Defina o tipo aqui
//   materiaNome: string = '';

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private atividadeService: AtividadeService
//   ) {}

//   ngOnInit() {
//     // Obter o nome da matéria da rota
//     this.route.params.subscribe(params => {
//       this.materiaNome = params['nome'];
//       this.loadAtividades();
//     });
//   }

//   loadAtividades() {
//     // Aqui você pode filtrar as atividades com base no nome da matéria
//     this.atividades = this.atividadeService.getAtividades().filter(atividade => atividade.materia === this.materiaNome);
//   }

//   verDetalhes(atividade: Atividade) {
//     this.router.navigate(['/detalhes-atividade', { atividade: JSON.stringify(atividade) }]);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtividadeService } from '../atividade.service'; // Ajuste o caminho conforme necessário

interface Atividade {
  descricao: string;
  dataEntrega: string;
  nota: number;
  materia: string;
}

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.page.html',
  styleUrls: ['./atividades.page.scss'],
})
export class AtividadesPage implements OnInit {
  atividades: Atividade[] = []; // Defina o tipo aqui

  constructor(private router: Router, private atividadeService: AtividadeService) {}

  ngOnInit() {
    // Obter as atividades do serviço
    this.atividades = this.atividadeService.getAtividades();
  }

  verDetalhes(atividade: Atividade) { // Defina o tipo aqui
    this.router.navigate(['/detalhes-atividade', { atividade: JSON.stringify(atividade) }]);
  }
}


