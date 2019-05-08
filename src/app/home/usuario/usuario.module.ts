import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";


import { UsuarioRoutingModule } from './usuario.routing';
import { UsuarioComponent } from './usuario.component';
import { LoaderComponent } from './loader/loader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

import { UsuariosService } from "./../admin/_services/usuarios.service";

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadersCssModule } from 'angular2-loaders-css';

import { ConfiguracionComponent } from './configuracion/configuracion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    ChartsModule,
    SimpleNotificationsModule.forRoot(),
    Ng2SearchPipeModule,
    LoadersCssModule,
    UsuarioRoutingModule
  ],
  declarations: [
    UsuarioComponent,
    LoaderComponent,
    DashboardComponent,
    ProfileComponent,
    ConfiguracionComponent,
  ],
  providers: [
    UsuariosService,
  ]
})
export class UsuarioModule { }
