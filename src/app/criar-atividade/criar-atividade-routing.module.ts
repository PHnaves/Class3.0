import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarAtividadePage } from './criar-atividade.page';

const routes: Routes = [
  {
    path: '',
    component: CriarAtividadePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarAtividadePageRoutingModule {}
