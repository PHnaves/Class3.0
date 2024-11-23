import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhesAtividadePageRoutingModule } from './detalhes-atividade-routing.module';

import { DetalhesAtividadePage } from './detalhes-atividade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesAtividadePageRoutingModule
  ],
  declarations: [DetalhesAtividadePage]
})
export class DetalhesAtividadePageModule {}
