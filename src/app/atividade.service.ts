// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AtividadeService {

//   constructor() { }
// }


// import { Injectable } from '@angular/core';

// interface Atividade {
//   descricao: string;
//   dataEntrega: string;
//   nota: number;
//   materia: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AtividadeService {
//   private atividades: Atividade[] = [];

//   constructor() {}

//   addAtividade(atividade: Atividade) {
//     this.atividades.push(atividade);
//   }

//   getAtividades() {
//     // Filtra atividades que ainda não passaram da data de entrega
//     return this.atividades.filter(atividade => new Date(atividade.dataEntrega) >= new Date());
//   }
// }

import { Injectable } from '@angular/core';

interface Atividade {
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

  constructor() {}

  addAtividade(atividade: Atividade) {
    this.atividades.push(atividade);
  }

  getAtividades() {
    return this.atividades;
  }

  // Método para contar atividades
  getContagemAtividades() {
    return this.atividades.length;
  }

  // Método para contar matérias diferentes
  getContagemMaterias() {
    const materias = new Set(this.atividades.map(atividade => atividade.materia));
    return materias.size;
  }

  // Método para obter atividades recentes (exemplo: as 3 mais recentes)
  getAtividadesRecentes() {
    return this.atividades
      .sort((a, b) => new Date(a.dataEntrega).getTime() - new Date(b.dataEntrega).getTime())
      .slice(0, 3); // Retorna as 3 atividades mais próximas
  }

  // Método para obter notificações (exemplo: pode ser um número fixo ou dinâmico)
  getNotificacoes() {
    // Aqui você pode implementar a lógica para contar notificações
    return 3; // Exemplo fixo
  }
}