import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesAtividadePage } from './detalhes-atividade.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesAtividadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesAtividadePageRoutingModule {}
