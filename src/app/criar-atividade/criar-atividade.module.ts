import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarAtividadePageRoutingModule } from './criar-atividade-routing.module';

import { CriarAtividadePage } from './criar-atividade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarAtividadePageRoutingModule
  ],
  declarations: [CriarAtividadePage]
})
export class CriarAtividadePageModule {}
