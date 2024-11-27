import { Component, OnInit } from '@angular/core';
import { AtividadeService, Atividade } from '../atividade.service';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.page.html',
  styleUrls: ['./atividades.page.scss'],
})
export class AtividadesPage implements OnInit {
  atividades: Atividade[] = [];
  materias: string[] = ['Matemática', 'Física', 'Química']; // Exemplo de matérias
  selectedMateria: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private atividadeService: AtividadeService) {}

  ngOnInit() {
    this.loadAtividades();
  }

  loadAtividades() {
    this.isLoading = true;
    this.atividadeService.getAtividades().subscribe(
      atividades => {
        this.atividades = atividades;
        this.isLoading = false;
      },
      error => {
        this.errorMessage = 'Erro ao carregar as atividades.';
        this.isLoading = false;
      }
    );
  }

  filterByMateria() {
    return this.atividades.filter(atividade => atividade.materia === this.selectedMateria);
  }

  criarAtividade() {
    // Navegar para a página de criar atividade
    // Isso pode ser feito usando o Router
  }

  doRefresh(event: any) {
    this.loadAtividades();
    event.target.complete();
  }

  verDetalhes(atividade: Atividade) {
    // Navegar para a página de detalhes da atividade
  }

  getStatusClass(dataEntrega: string): string {
    // Implementar a lógica para retornar a classe com base na data de entrega
    return ''; // Retornar a classe apropriada
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR'); // Formatar a data
  }
}