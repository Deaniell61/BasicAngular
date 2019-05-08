import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { LoadersCssModule } from 'angular2-loaders-css';
import { RecoveryComponent } from "./recovery/recovery.component";

import { AuthGuard } from "./_guards/auth.guard";
import { HomeGuard } from "./_guards/home.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',loadChildren: 'app/home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [HomeGuard]},
  { path: 'recovery', component: RecoveryComponent, canActivate: [HomeGuard]},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
