// src/app/criar-atividade/criar-atividade.page.ts
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
  materias: any[] = [];

  constructor(
    private router: Router, 
    private atividadeService: AtividadeService, 
    private materiaService: MateriaService
  ) {}

  ngOnInit() {
    this.materias = this.materiaService.getMaterias(); // Obter matérias
  }

  onSubmit() {
    this.atividadeService.addAtividade(this.atividade);
    this.router.navigate(['/atividades']); // Redirecionar para a lista de atividades
  }

  isFormValid(): boolean {
    return (
      this.atividade.descricao.trim() !== '' &&
      this.atividade.dataEntrega !== '' &&
      this.atividade.materia !== ''
    );
  }
}