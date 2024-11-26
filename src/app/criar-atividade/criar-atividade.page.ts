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
  errorMessage: string = '';
  isLoading: boolean = false;

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
    this.isLoading = true;
    this.errorMessage = '';

    // Format the date before sending
    const formattedAtividade = {
      ...this.atividade,
      dataEntrega: this.formatDate(this.atividade.dataEntrega)
    };

    // Adicionar a atividade usando o serviço atualizado que integra com o banco
    this.atividadeService.addAtividade(formattedAtividade).subscribe(
      (response) => {
        console.log('Atividade criada com sucesso:', response);
        this.isLoading = false;
        this.router.navigate(['/atividades']); // Redireciona para a página de atividades
      },
      (error) => {
        console.error('Erro ao criar atividade:', error);
        this.errorMessage = 'Erro ao criar atividade. Por favor, tente novamente.';
        this.isLoading = false;
      }
    );
  }

// Método para validar o formulário antes do envio
  isFormValid(): boolean {
    return (
      this.atividade.descricao.trim() !== '' &&
      this.atividade.dataEntrega !== '' &&
      this.atividade.materia !== ''
    );
  }

  // Método para formatar a data no formato aceito pelo MySQL (YYYY-MM-DD)
  private formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}
