// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CalendarioService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';

interface Mark {
  date: string; // Data no formato 'YYYY-MM-DD'
  color: string; // Cor da marcação
  description: string; // Descrição da marcação
}

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private marks: Mark[] = [];

  addMark(mark: Mark) {
    this.marks.push(mark);
  }

  getMarks() {
    return this.marks;
  }
}