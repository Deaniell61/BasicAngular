import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "./../_services/auth.service";

import { NotificationsService } from 'angular2-notifications';

declare var $: any

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
auth:any
closeResult: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private _service: NotificationsService) { }

    public options = {
    position: ["bottom", "right"],
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    lastOnBottom: false,
    preventDuplicates: true,
    animate: "scale",
    maxLength: 400
  };

  create(text) {
         this._service.error('Error!','Ha ocurrido un error.'+text)

  }
  login(formValue:any){
   $('#Loading').css('display','block')
   $('#Loading').addClass('in')

    this.authenticationService.Authentication(formValue)
      .then(response => {
        this.auth = response
        let type:string = null;
        localStorage.setItem('currentUser', response.username);
        localStorage.setItem('currentEmail', response.email);
        localStorage.setItem('currentFirstName', response.nombres);
        localStorage.setItem('currentLastName', response.apellidos);
        localStorage.setItem('currentId', response.id);
        localStorage.setItem('currentState', response.state);

        switch(response.rol){
          case 1:{
            type = 'admin';
            break;
          }
          default:{
            type = 'usuario';
            break;
          }
        }

        localStorage.setItem('currentType', type);
        // console.log(type)
        console.clear
        this.router.navigate([`home/${type}`])
      }).catch(error => {
        console.clear
        $('#Loading').css('display','none')
        this.create(error)

      })


  }
  ngOnInit() {
  }

}
