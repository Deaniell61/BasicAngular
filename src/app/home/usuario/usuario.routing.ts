import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from "./usuario.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


import { ProfileComponent } from "./profile/profile.component";
import { ConfiguracionComponent } from './configuracion/configuracion.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: UsuarioComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'config', component: ConfiguracionComponent },
  ]},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
