// import { Component, OnInit } from '@angular/core';

// export class Day {
//   public number!: number; // Adicionado o operador "!"
//   public year!: number;
//   public month!: string;
//   public monthIndex!: number;
//   public weekDayName!: string;
//   public weekDayNumber!: number;
// }

// @Component({
//   selector: 'app-calendario',
//   templateUrl: './calendario.page.html',
//   styleUrls: ['./calendario.page.scss'],
// })
// export class CalendarioPage implements OnInit {
//   currentYear: number;
//   currentMonthIndex: number;

//   monthDays: Day[] = []; // Inicializado como array vazio
//   monthNumber: number = 0; // Inicializado com valor padrão
//   year: number = 0; // Inicializado com valor padrão

//   weekDaysName: string[] = []; // Especificado como array de strings

//   constructor() {
//     let date = new Date();
//     this.currentYear = date.getFullYear();
//     this.currentMonthIndex = date.getMonth();
//   }

//   getCurrentMonth(): Day[] {
//     return this.getMonth(this.currentMonthIndex, this.currentYear);
//   }

//   getMonth(monthIndex: number, year: number): Day[] {
//     let days: Day[] = [];

//     let firstday = this.createDay(1, monthIndex, year);

//     // Criar dias vazios
//     for (let i = 1; i < firstday.weekDayNumber; i++) {
//       days.push({
//         weekDayNumber: i,
//         monthIndex: monthIndex,
//         year: year,
//       } as Day);
//     }
//     days.push(firstday);

//     let countDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//     for (let i = 1; i < countDaysInMonth + 1; i++) {
//       days.push(this.createDay(i, monthIndex, year));
//     }

//     return days;
//   }

//   getMonthName(monthIndex: number): string {
//     const months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];
//     return months[monthIndex] || '';
//   }

//   getWeekDayName(weekDay: number): string {
//     const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
//     return weekDays[weekDay] || '';
//   }

//   createDay(dayNumber: number, monthIndex: number, year: number): Day {
//     let day = new Day();

//     day.monthIndex = monthIndex;
//     day.month = this.getMonthName(monthIndex);

//     day.number = dayNumber;
//     day.year = this.currentYear;

//     day.weekDayNumber = new Date(year, monthIndex, dayNumber).getDay();
//     day.weekDayName = this.getWeekDayName(day.weekDayNumber);

//     return day;
//   }

//   ngOnInit() {
//     this.setMonthDays(this.getCurrentMonth());

//     this.weekDaysName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
//   }

//   onNextMonth() {
//     this.monthNumber++;

//     if (this.monthNumber == 13) {
//       this.monthNumber = 1;
//       this.year++;
//     }

//     this.setMonthDays(this.getMonth(this.monthNumber, this.year));
//   }

//   onPreviousMonth() {
//     this.monthNumber--;

//     if (this.monthNumber < 1) {
//       this.monthNumber = 12;
//       this.year--;
//     }

//     this.setMonthDays(this.getMonth(this.monthNumber, this.year));
//   }

//   setMonthDays(days: Day[]) {
//     this.monthDays = days;
//     this.monthNumber = this.monthDays[0]?.monthIndex || 0;
//     this.year = this.monthDays[0]?.year || this.currentYear;
//   }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };
}

