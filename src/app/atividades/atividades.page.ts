import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtividadeService, Atividade } from '../atividade.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.page.html',
  styleUrls: ['./atividades.page.scss'],
})
export class AtividadesPage implements OnInit {
  atividades: Atividade[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router, 
    private atividadeService: AtividadeService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    await this.loadAtividades();
  }

  async ionViewWillEnter() {
    // Recarrega as atividades sempre que a página for exibida
    await this.loadAtividades();
  }

  async loadAtividades() {
    const loading = await this.loadingController.create({
      message: 'Carregando atividades...'
    });
    await loading.present();

    this.atividadeService.getAtividades().subscribe(
      (atividades) => {
        this.atividades = atividades;
        this.errorMessage = '';
        loading.dismiss();
      },
      (error) => {
        console.error('Erro ao carregar atividades:', error);
        this.errorMessage = 'Erro ao carregar atividades. Por favor, tente novamente.';
        loading.dismiss();
      }
    );
  }

  verDetalhes(atividade: Atividade) {
    this.router.navigate(['/detalhes-atividade', { id: atividade.id }]);
  }

  criarAtividade() {
    this.router.navigate(['/criar-atividade']);
  }

  // Formata a data para exibição
  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  // Retorna a classe CSS baseada no status da atividade
  getStatusClass(dataEntrega: string): string {
    const hoje = new Date();
    const dataLimite = new Date(dataEntrega);
    
    if (dataLimite < hoje) {
      return 'atrasada';
    } else if (dataLimite.getTime() - hoje.getTime() <= 3 * 24 * 60 * 60 * 1000) {
      return 'proxima';
    }
    return 'em-dia';
  }

  // Atualiza a lista usando pull-to-refresh
  async doRefresh(event: any) {
    try {
      await this.loadAtividades();
    } finally {
      event.target.complete();
    }
  }
}
