// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-detalhes-atividade',
//   templateUrl: './detalhes-atividade.page.html',
//   styleUrls: ['./detalhes-atividade.page.scss'],
// })
// export class DetalhesAtividadePage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes-atividade',
  templateUrl: './detalhes-atividade.page.html',
  styleUrls: ['./detalhes-atividade.page.scss'],
})
export class DetalhesAtividadePage implements OnInit {
  atividade: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.atividade = JSON.parse(params['atividade']);
    });
  }
}