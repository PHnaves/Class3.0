import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Atividade {
  id: number;
  descricao: string;
  dataEntrega: string;
  nota: number;
  materia: string;
}

@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
  private atividades: Atividade[] = [];
  private atividadesSubject = new BehaviorSubject<Atividade[]>(this.atividades);

  // Método para obter as atividades
  getAtividades() {
    return this.atividadesSubject.asObservable();
  }

  // Método para adicionar uma nova atividade
  addAtividade(atividade: Omit<Atividade, 'id'>) {
    const newAtividade: Atividade = {
      ...atividade,
      id: this.atividades.length + 1, // Gerar um novo ID para a atividade
    };
    this.atividades.push(newAtividade);
    this.atividadesSubject.next(this.atividades); // Atualiza a lista de atividades
  }

  // Método para obter atividades por matéria
  getAtividadesPorMateria(materia: string) {
    return this.atividades.filter((atividade) => atividade.materia === materia);
  }
}
