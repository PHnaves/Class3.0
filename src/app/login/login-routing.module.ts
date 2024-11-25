import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page'; // Verifique se o caminho está correto

const routes: Routes = [
  {
    path: '',
    component: LoginPage, // Verifique se o nome está correto
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}