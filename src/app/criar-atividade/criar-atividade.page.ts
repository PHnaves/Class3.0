// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-criar-atividade',
//   templateUrl: './criar-atividade.page.html',
//   styleUrls: ['./criar-atividade.page.scss'],
// })
// export class CriarAtividadePage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AtividadeService } from '../atividade.service';

// @Component({
//   selector: 'app-criar-atividade',
//   templateUrl: './criar-atividade.page.html',
//   styleUrls: ['./criar-atividade.page.scss'],
// })
// export class CriarAtividadePage {
//   atividade = {
//     descricao: '',
//     dataEntrega: '',
//     nota: 0, 
//     materia: ''
//   };

//   constructor(private router: Router, private atividadeService: AtividadeService) {}

//   onSubmit() {
//     // Armazenar a atividade usando o serviço
//     this.atividadeService.addAtividade(this.atividade);
//     this.router.navigate(['/atividades']); // Redireciona para a página de atividades
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AtividadeService } from '../atividade.service';
// import { MateriaService } from '../materia.service';

// @Component({
//   selector: 'app-criar-atividade',
//   templateUrl: './criar-atividade.page.html',
//   styleUrls: ['./criar-atividade.page.scss'],
// })
// export class CriarAtividadePage implements OnInit {
//   atividade = {
//     descricao: '',
//     dataEntrega: '',
//     nota: 0, 
//     materia: ''
//   };

//   materias: any[] = []; // Array to hold subjects

//   constructor(private router: Router, private atividadeService: AtividadeService, private materiaService: MateriaService) {}

//   ngOnInit() {
//     // Fetch existing subjects from the service
//     this.materias = this.materiaService.getMaterias();
//   }

//   onSubmit() {
//     this.atividadeService.addAtividade(this.atividade);
//     this.router.navigate(['/atividades']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtividadeService } from '../atividade.service';
import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-criar-atividade',
  templateUrl: './criar-atividade.page.html',
  styleUrls: ['./criar-atividade.page.scss'],
})
export class CriarAtividadePage implements OnInit {
  atividade = {
    descricao: '',
    dataEntrega: '',
    nota: 0, 
    materia: ''
  };

  materias: any[] = []; // Array para armazenar as matérias

  constructor(
    private router: Router, 
    private atividadeService: AtividadeService, 
    private materiaService: MateriaService
  ) {}

  ngOnInit() {
    // Obter as matérias existentes do serviço
    this.materias = this.materiaService.getMaterias();
  }

  onSubmit() {
    // Adicionar a atividade ao serviço
    this.atividadeService.addAtividade(this.atividade);
    this.router.navigate(['/atividades']); // Redireciona para a página de atividades
  }
}