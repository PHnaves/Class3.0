// src/app/atividade.service.ts
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
  providedIn: 'root'
})
export class AtividadeService {
  private atividades: Atividade[] = [];
  private atividadesSubject = new BehaviorSubject<Atividade[]>(this.atividades);

  getAtividades() {
    return this.atividadesSubject.asObservable();
  }

  addAtividade(atividade: Omit<Atividade, 'id'>) { // Use Omit para excluir 'id' do tipo
    const newAtividade: Atividade = { ...atividade, id: this.atividades.length + 1 }; // Gerar um novo ID
    this.atividades.push(newAtividade);
    this.atividadesSubject.next(this.atividades);
  }
}