import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}'); // Adicionando valor padrão
  }
}