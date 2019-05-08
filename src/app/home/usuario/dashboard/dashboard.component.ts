import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { UsersTypesService } from "../../admin/_services/users-types.service";
import { NotificationsService } from 'angular2-notifications';
declare var $: any
import { path } from "../../../config.module";
import { UsuariosService } from '../../admin/_services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Table:any
  comboChild:any
  comboChild2:any
  selectedData:any
  parentCombo:any
  beginDate:any
  endDate:any
  userId:any = localStorage.getItem('currentId');
  public rowsOnPage = 5;
  public search:any
  constructor(
    private _service: NotificationsService,
    private userService: UsuariosService

  ) { }

  ngOnInit() {
    this.cargarSingle()
  }
  cargarSingle(){
    this.userService.getSingle(this.userId)
                    .then(response => {
                      this.selectedData = response;
                    }).catch(error => {
                      console.clear
                      this.createError(error)
                    })
  }

  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: false,
    animate: "fromLeft",
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
};

create(success) {
     this._service.success('¡Éxito!',success)

}
createError(error) {
     this._service.error('¡Error!',error)

}
}
