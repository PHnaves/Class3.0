import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MateriaService, Materia } from '../materia.service';
import { AtividadeService } from '../atividade.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  materias: Materia[] = [];
  filteredMaterias: Materia[] = [];
  searchTerm: string = '';

  constructor(
    private materiaService: MateriaService,
    private atividadeService: AtividadeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.materiaService.getMaterias().subscribe(materias => {
      this.materias = materias;
      this.filteredMaterias = materias;
    });
  }

  filterMaterias() {
    if (!this.searchTerm.trim()) {
      this.filteredMaterias = this.materias;
    } else {
      this.filteredMaterias = this.materias.filter(materia => 
        materia.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  getAtividadesCount(materia: Materia): number {
    return this.atividadeService.getAtividadesPorMateria(materia.nome).length;
  }

  goToAtividades(materia: Materia) {
    this.router.navigate(['/atividades'], { 
      queryParams: { 
        materia: materia.nome 
      }
    });
  }
}
