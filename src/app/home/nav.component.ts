import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UsuariosService } from "./admin/_services/usuarios.service";

import { NotificationsService } from 'angular2-notifications';

declare var $: any

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  type=localStorage.getItem('currentType');
  id=localStorage.getItem('currentId');
  firstname=localStorage.getItem('currentFirstName');
  lastname=localStorage.getItem('currentLastName');
  state=localStorage.getItem('currentState');
  picture =null
  user =localStorage.getItem('currentUser');
  click:boolean
  constructor(
    private _service: NotificationsService,
    private userService: UsuariosService
  ) { }

  ngOnInit() {
    if(this.state=='21'){
      $('#ChangePass').modal();
    }
  }

  hideNav(){
    if(!this.click){
      $('#page-wrapper').css('margin-left','0px')
      $('.nicescroll').css('width','0px')
      $('#apple-admin').css('display','none')
      $('.top-left-part').css('width','70px')
      this.click = !this.click
    }else{
      $('#page-wrapper').css('margin-left','')
      $('.nicescroll').css('width','')
      $('#apple-admin').css('display','')
      $('.top-left-part').css('width','')
      this.click = !this.click
    }

  }
  updatePass(formValue:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    let data = {
      id: this.id,
      old_pass: formValue.old_pass,
      new_pass: formValue.new_pass,
      new_pass_rep: formValue.new_pass2
    }
    this.userService.updatePass(data)
                      .then(response => {
                        console.clear
                        this.create('Usuario Actualizado exitosamente')
                        $('#Loading').css('display','none')
                        $("#ChangePass .close").click();
                        $('#passChange-form')[0].reset()
                        localStorage.setItem('currentState',response.state);
                      }).catch(error => {
                        console.clear
                        this.createError(error)

                        $('#Loading').css('display','none')
                      })

  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentEmail');
    localStorage.removeItem('currentFirstName');
    localStorage.removeItem('currentLastName');
    localStorage.removeItem('currentId');
    localStorage.removeItem('currentType');
    location.reload();
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
