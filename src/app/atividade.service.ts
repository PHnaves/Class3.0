import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Attachment {
  id: number;
  name: string;
  type: string;
  content: string; // Base64 string for files
}

export interface Link {
  id: number;
  url: string;
  description: string;
}

export interface Atividade {
  id: number;
  descricao: string;
  dataEntrega: string;
  nota: number;
  materia: string;
  detalhes: string;
  attachments: Attachment[];
  links: Link[];
  createdBy: number; // ID do professor que criou
  submissions: {
    studentId: number;
    attachments: Attachment[];
    links: Link[];
    submissionDate: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
  private atividades: Atividade[] = [];
  private atividadesSubject = new BehaviorSubject<Atividade[]>(this.atividades);

  constructor() {
    // Carregar atividades do localStorage
    const savedAtividades = localStorage.getItem('atividades');
    if (savedAtividades) {
      this.atividades = JSON.parse(savedAtividades);
      this.atividadesSubject.next(this.atividades);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('atividades', JSON.stringify(this.atividades));
  }

  getAtividades(): Observable<Atividade[]> {
    return this.atividadesSubject.asObservable();
  }

  addAtividade(atividade: Omit<Atividade, 'id' | 'attachments' | 'links' | 'submissions'>) {
    const newAtividade: Atividade = {
      ...atividade,
      id: Date.now(),
      attachments: [],
      links: [],
      submissions: []
    };
    this.atividades.push(newAtividade);
    this.atividadesSubject.next(this.atividades);
    this.saveToLocalStorage();
  }

  getAtividadesPorMateria(materia: string): Atividade[] {
    return this.atividades.filter((atividade) => atividade.materia === materia);
  }

  getAtividadeById(id: number): Atividade | undefined {
    return this.atividades.find(atividade => atividade.id === id);
  }

  addSubmission(atividadeId: number, studentId: number, attachments: Attachment[], links: Link[]) {
    const atividade = this.getAtividadeById(atividadeId);
    if (atividade) {
      // Remove previous submission if exists
      atividade.submissions = atividade.submissions.filter(sub => sub.studentId !== studentId);
      
      // Add new submission
      atividade.submissions.push({
        studentId,
        attachments,
        links,
        submissionDate: new Date().toISOString()
      });
      
      this.atividadesSubject.next(this.atividades);
      this.saveToLocalStorage();
    }
  }

  addAttachmentToAtividade(atividadeId: number, attachment: Omit<Attachment, 'id'>) {
    const atividade = this.getAtividadeById(atividadeId);
    if (atividade) {
      const newAttachment: Attachment = {
        ...attachment,
        id: Date.now()
      };
      atividade.attachments.push(newAttachment);
      this.atividadesSubject.next(this.atividades);
      this.saveToLocalStorage();
    }
  }

  addLinkToAtividade(atividadeId: number, link: Omit<Link, 'id'>) {
    const atividade = this.getAtividadeById(atividadeId);
    if (atividade) {
      const newLink: Link = {
        ...link,
        id: Date.now()
      };
      atividade.links.push(newLink);
      this.atividadesSubject.next(this.atividades);
      this.saveToLocalStorage();
    }
  }

  getSubmissionsByStudent(atividadeId: number, studentId: number) {
    const atividade = this.getAtividadeById(atividadeId);
    return atividade?.submissions.find(sub => sub.studentId === studentId);
  }
}
