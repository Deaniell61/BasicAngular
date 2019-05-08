import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";


import { ProfileComponent } from "./profile/profile.component";
import { ConfiguracionComponent } from "./configuracion/configuracion.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { UsuariosTipoComponent } from "./usuarios-tipo/usuarios-tipo.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: AdminComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'config', component: ConfiguracionComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'roles', component: UsuariosTipoComponent },
  ]},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
