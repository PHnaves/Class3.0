// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-materias',
//   templateUrl: './materias.page.html',
//   styleUrls: ['./materias.page.scss'],
// })
// export class MateriasPage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MateriaService } from '../materia.service'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  materias: any[] = [];
  filteredMaterias: any[] = [];
  searchTerm: string = '';
  sortOption: string = 'alfabetica'; // Opção de ordenação inicial

  constructor(private materiaService: MateriaService, private router: Router) {}

  ngOnInit() {
    this.materias = this.materiaService.getMaterias();
    this.filteredMaterias = this.materias;
  }

  filterMaterias() {
    this.filteredMaterias = this.materias.filter(materia => 
      materia.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // sortMaterias() {
  //   this.filteredMaterias = this.materiaService.getMateriasOrdenadas(this.sortOption);
  // }

  goToAtividades(materia: string) {
    this.router.navigate(['/atividades', { nome: materia }]); // Ajuste a rota conforme necessário
  }
}