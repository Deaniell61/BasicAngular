import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { DataTableModule } from "angular2-datatable";
import { AngularMultiSelectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown';


import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { LoaderComponent } from './loader/loader.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

import { UsuariosService } from "./_services/usuarios.service";
import { UsersTypesService } from "./_services/users-types.service";

import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadersCssModule } from 'angular2-loaders-css';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { UsuariosTipoComponent } from './usuarios-tipo/usuarios-tipo.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    ChartsModule,
    SimpleNotificationsModule.forRoot(),
    Ng2SearchPipeModule,
    LoadersCssModule,
    AngularMultiSelectModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    LoaderComponent,
    DashboardComponent,
    ProfileComponent,
    ConfiguracionComponent,
    UsuariosTipoComponent,
    UsuariosComponent,
  ],
  providers: [
    UsuariosService,
    UsersTypesService,
  ]
})
export class AdminModule { }
