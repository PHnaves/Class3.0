import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtividadeService, Atividade } from '../atividade.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.page.html',
  styleUrls: ['./atividades.page.scss'],
})
export class AtividadesPage implements OnInit {
  atividades: Atividade[] = [];
  materiaFiltro?: string;
  
  get isProfessor(): boolean {
    return this.authService.isProfessor();
  }

  constructor(
    private atividadeService: AtividadeService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Inscrever-se para mudanças nos parâmetros da rota
    this.route.queryParams.subscribe(params => {
      this.materiaFiltro = params['materia'];
      this.loadAtividades();
    });

    // Inscrever-se para mudanças nas atividades
    this.atividadeService.getAtividades().subscribe(atividades => {
      if (this.materiaFiltro) {
        this.atividades = atividades.filter(a => 
          a.materia.toLowerCase() === this.materiaFiltro?.toLowerCase()
        );
      } else {
        this.atividades = atividades;
      }
    });
  }

  loadAtividades() {
    this.atividadeService.getAtividades().subscribe(atividades => {
      if (this.materiaFiltro) {
        this.atividades = atividades.filter(a => 
          a.materia.toLowerCase() === this.materiaFiltro?.toLowerCase()
        );
      } else {
        this.atividades = atividades;
      }
    });
  }

  criarAtividade() {
    this.router.navigate(['/criar-atividade']);
  }

  verDetalhes(atividade: Atividade) {
    this.router.navigate(['/detalhes-atividade', atividade.id]);
  }

  getDataFormatada(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
