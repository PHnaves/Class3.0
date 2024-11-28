import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  private materias = ['Matemática', 'Português', 'História', 'Ciências'];

  constructor() {}

  // Método para obter as matérias
  getMaterias() {
    return this.materias;
  }
}
