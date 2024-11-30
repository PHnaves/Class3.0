import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AtividadeService, Atividade, Attachment, Link } from '../atividade.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-detalhes-atividade',
  templateUrl: './detalhes-atividade.page.html',
  styleUrls: ['./detalhes-atividade.page.scss'],
})
export class DetalhesAtividadePage implements OnInit {
  atividade?: Atividade;
  selectedFiles: File[] = [];
  submissionLinks: Link[] = [];
  newLink: { url: string; description: string } = { url: '', description: '' };
  
  get isAluno(): boolean {
    return this.authService.isAluno();
  }

  get isProfessor(): boolean {
    return this.authService.isProfessor();
  }

  constructor(
    private route: ActivatedRoute,
    private atividadeService: AtividadeService,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const atividadeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAtividade(atividadeId);
  }

  // Helper methods para lidar com valores undefined
  getAttachments(atividade: Atividade): Attachment[] {
    return atividade.attachments || [];
  }

  getLinks(atividade: Atividade): Link[] {
    return atividade.links || [];
  }

  getSubmissions(atividade: Atividade) {
    return atividade.submissions || [];
  }

  getSubmissionAttachments(submission: any): Attachment[] {
    return submission.attachments || [];
  }

  getSubmissionLinks(submission: any): Link[] {
    return submission.links || [];
  }

  private loadAtividade(id: number) {
    const atividadeFound = this.atividadeService.getAtividadeById(id);
    if (atividadeFound) {
      this.atividade = atividadeFound;
      
      // Carregar submissão existente se for aluno
      if (this.isAluno) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          const submission = this.atividadeService.getSubmissionsByStudent(id, currentUser.id);
          if (submission) {
            this.submissionLinks = [...submission.links];
          }
        }
      }
    }
  }

  async onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Verificar tamanho do arquivo (limite de 5MB)
        if (file.size > 5 * 1024 * 1024) {
          await this.showToast(`Arquivo ${file.name} muito grande. Limite de 5MB.`);
          continue;
        }
        this.selectedFiles.push(file);
      }
    }
  }

  removeFile(file: File) {
    const index = this.selectedFiles.indexOf(file);
    if (index > -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

  addLink() {
    if (!this.newLink.url || !this.newLink.description) {
      this.showToast('Por favor, preencha a URL e a descrição do link');
      return;
    }

    if (!this.isValidUrl(this.newLink.url)) {
      this.showToast('Por favor, insira uma URL válida');
      return;
    }

    this.submissionLinks.push({
      id: Date.now(),
      url: this.newLink.url,
      description: this.newLink.description
    });

    // Limpar campos
    this.newLink = { url: '', description: '' };
  }

  removeLink(link: Link) {
    const index = this.submissionLinks.findIndex(l => l.id === link.id);
    if (index > -1) {
      this.submissionLinks.splice(index, 1);
    }
  }

  async submitAtividade() {
    if (!this.atividade || !this.authService.getCurrentUser()) {
      return;
    }

    const attachments: Attachment[] = [];
    
    // Converter arquivos para base64
    for (const file of this.selectedFiles) {
      try {
        const base64 = await this.fileToBase64(file);
        attachments.push({
          id: Date.now(),
          name: file.name,
          type: file.type,
          content: base64
        });
      } catch (error) {
        await this.showToast(`Erro ao processar arquivo ${file.name}`);
        return;
      }
    }

    // Salvar submissão
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.atividadeService.addSubmission(
        this.atividade.id,
        currentUser.id,
        attachments,
        this.submissionLinks
      );
      
      await this.showToast('Atividade enviada com sucesso!', 'success');
      
      // Limpar formulário
      this.selectedFiles = [];
      this.submissionLinks = [];
    }
  }

  downloadFile(attachment: Attachment) {
    // Criar blob a partir do base64
    const byteCharacters = atob(attachment.content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: attachment.type });

    // Criar URL e iniciar download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = attachment.name;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  canSubmit(): boolean {
    return (this.selectedFiles.length > 0 || this.submissionLinks.length > 0);
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        // Remover o prefixo "data:*/*;base64," do resultado
        resolve(base64.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  }

  private async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    toast.present();
  }
}
