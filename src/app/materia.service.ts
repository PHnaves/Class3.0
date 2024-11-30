import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Materia {
  id: number;
  nome: string;
  descricao?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  private materias: Materia[] = [
    { id: 1, nome: 'Matemática', descricao: 'Matemática básica e avançada' },
    { id: 2, nome: 'Português', descricao: 'Língua portuguesa e literatura' },
    { id: 3, nome: 'História', descricao: 'História geral e do Brasil' },
    { id: 4, nome: 'Ciências', descricao: 'Ciências naturais' },
    { id: 5, nome: 'Geografia', descricao: 'Geografia geral e do Brasil' },
    { id: 6, nome: 'Inglês', descricao: 'Língua inglesa' }
  ];

  private materiasSubject = new BehaviorSubject<Materia[]>(this.materias);

  constructor() {
    // Carregar matérias do localStorage se existirem
    const savedMaterias = localStorage.getItem('materias');
    if (savedMaterias) {
      this.materias = JSON.parse(savedMaterias);
      this.materiasSubject.next(this.materias);
    }
  }

  getMaterias(): Observable<Materia[]> {
    return this.materiasSubject.asObservable();
  }

  getMateriasArray(): Materia[] {
    return this.materias;
  }

  getMateriaById(id: number): Materia | undefined {
    return this.materias.find(m => m.id === id);
  }

  getMateriaByNome(nome: string): Materia | undefined {
    return this.materias.find(m => m.nome.toLowerCase() === nome.toLowerCase());
  }

  addMateria(materia: Omit<Materia, 'id'>) {
    const newMateria = {
      ...materia,
      id: Date.now()
    };
    this.materias.push(newMateria);
    this.saveToLocalStorage();
    this.materiasSubject.next(this.materias);
  }

  private saveToLocalStorage() {
    localStorage.setItem('materias', JSON.stringify(this.materias));
  }
}
