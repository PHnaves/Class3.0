import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Dados mockados para teste
  contagemAtividades: number = 5;
  contagemMaterias: number = 3;
  contagemNotificacoes: number = 2;
  atividadesRecentes = [
    {
      id: 1,
      descricao: 'Trabalho de Matemática',
      materia: 'Matemática',
      dataEntrega: '2024-02-20',
      nota: 10
    },
    {
      id: 2,
      descricao: 'Apresentação de História',
      materia: 'História',
      dataEntrega: '2024-02-25',
      nota: 8.5
    },
    {
      id: 3,
      descricao: 'Projeto de Ciências',
      materia: 'Ciências',
      dataEntrega: '2024-03-01',
      nota: 9.0
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Inicialização básica
  }

  // Método para formatar a data
  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  // Método para navegar para os detalhes da atividade
  verDetalhes(atividade: any) {
    this.router.navigate(['/detalhes-atividade', { id: atividade.id }]);
  }

  // Método para criar nova atividade
  criarAtividade() {
    this.router.navigate(['/criar-atividade']);
  }
}
