import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtividadeService } from '../atividade.service';
import { MateriaService, Materia } from '../materia.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-criar-atividade',
  templateUrl: './criar-atividade.page.html',
  styleUrls: ['./criar-atividade.page.scss'],
})
export class CriarAtividadePage implements OnInit {
  novaAtividade = {
    descricao: '',
    materia: '',
    dataEntrega: '',
    nota: 0,
    detalhes: '',
  };

  materias: Materia[] = [];
  now: string = ''; // Data mínima para o campo de data

  constructor(
    private atividadeService: AtividadeService,
    private materiaService: MateriaService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Inicializar data mínima
    const today = new Date();
    this.now = today.toISOString().split('T')[0];

    // Verificar se o usuário é professor
    if (!this.authService.isProfessor()) {
      this.router.navigate(['/atividades']);
      return;
    }

    // Carregar matérias
    this.materiaService.getMaterias().subscribe((materias) => {
      this.materias = materias;
    });
  }

  async criarAtividade() {
    if (!this.validarCampos()) {
      await this.exibirToast(
        'Por favor, preencha todos os campos obrigatórios',
        'danger'
      );
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      await this.exibirToast('Erro ao identificar o usuário', 'danger');
      return;
    }

    // Adicionar nova atividade
    this.atividadeService.addAtividade({
      ...this.novaAtividade,
      createdBy: currentUser.id,
    });

    await this.exibirToast('Atividade criada com sucesso!', 'success');

    // Navegar para a lista de atividades da matéria específica
    this.router.navigate(['/atividades'], {
      queryParams: { materia: this.novaAtividade.materia },
    });
  }

  private validarCampos(): boolean {
    return (
      this.novaAtividade.descricao.trim() !== '' &&
      this.novaAtividade.materia.trim() !== '' &&
      this.novaAtividade.dataEntrega.trim() !== ''
    );
  }

  private async exibirToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor,
    });
    toast.present();
  }
}
