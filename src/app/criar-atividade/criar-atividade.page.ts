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
  atividade = { descricao: '', dataEntrega: '', nota: 0, materia: '' };
  materias: any[] = [];

  constructor(
    private router: Router,
    private atividadeService: AtividadeService,
    private materiaService: MateriaService
  ) {}

  ngOnInit() {
    // Obter matérias do serviço de matérias e garantir que estão sendo carregadas corretamente
    this.materias = this.materiaService.getMaterias();
  }

  onSubmit() {
    // Adiciona a atividade com a matéria associada corretamente
    this.atividadeService.addAtividade(this.atividade);
    this.router.navigate(['/atividades']); // Redireciona para a lista de atividades
  }

  isFormValid(): boolean {
    // Verifica se todos os campos obrigatórios estão preenchidos
    return (
      this.atividade.descricao.trim() !== '' &&
      this.atividade.dataEntrega !== '' &&
      this.atividade.materia !== ''
    );
  }
}
