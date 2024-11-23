// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class MateriaService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';

interface Materia {
  id: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private materias: Materia[] = [
    { id: 1, nome: 'Matemática' },
    { id: 2, nome: 'Física' },
    { id: 3, nome: 'Química' },
    // Add more subjects as needed
  ];

  getMaterias() {
    return this.materias;
  }
}