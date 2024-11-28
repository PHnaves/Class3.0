import { Component, OnInit } from '@angular/core';
import { AtividadeService } from '../atividade.service';
import { MateriaService } from '../materia.service';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.page.html',
  styleUrls: ['./atividades.page.scss'],
})
export class AtividadesPage implements OnInit {
  atividades: any[] = [];
  materias: string[] = []; // Definindo a variável 'materias' que estava faltando
  materiaSelecionada: string = '';

  constructor(
    private atividadeService: AtividadeService,
    private materiaService: MateriaService
  ) {}

  ngOnInit() {
    // Obtém todas as atividades e matérias ao inicializar a página
    this.atividadeService.getAtividades().subscribe((atividades) => {
      this.atividades = atividades;
    });

    // Obtém as matérias do serviço MateriaService
    this.materias = this.materiaService.getMaterias();
  }

  // Filtra as atividades com base na matéria selecionada
  filtrarAtividadesPorMateria() {
    if (this.materiaSelecionada) {
      this.atividades = this.atividadeService.getAtividadesPorMateria(this.materiaSelecionada);
    }
  }
}
