
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-calendario',
//   templateUrl: './calendario.page.html',
//   styleUrls: ['./calendario.page.scss'],
// })
// export class CalendarioPage {
//   isWeekday = (dateString: string) => {
//     const date = new Date(dateString);
//     const utcDay = date.getUTCDay();

//     /**
//      * Date will be enabled if it is not
//      * Sunday or Saturday
//      */
//     return utcDay !== 0 && utcDay !== 6;
//   };
// }

import { Component, OnInit } from '@angular/core';
import { CalendarioService } from '../calendario.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  selectedDate: string = '';
  selectedColor: string = '#FF0000'; // Cor padrão
  description: string = '';
  marks: any[] = [];

  constructor(private calendarService: CalendarioService) {}

  ngOnInit() {
    this.marks = this.calendarService.getMarks();
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    this.updateMarks();
  }

  addMark() {
    if (this.selectedDate && this.description) {
      this.calendarService.addMark({
        date: this.selectedDate,
        color: this.selectedColor,
        description: this.description
      });
      this.marks = this.calendarService.getMarks();
      this.description = ''; // Limpa a descrição após adicionar
    }
  }

  updateMarks() {
    // Atualiza as marcações para o dia selecionado
    const mark = this.marks.find(m => m.date === this.selectedDate);
    if (mark) {
      this.selectedColor = mark.color;
      this.description = mark.description;
    } else {
      this.selectedColor = '#FF0000'; // Reset para cor padrão
      this.description = '';
    }
  }
}

