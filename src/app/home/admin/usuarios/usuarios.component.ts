import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { UsuariosService } from "../_services/usuarios.service";
import { NotificationsService } from 'angular2-notifications';

declare var $: any
import { path } from "../../../config.module";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  userTable:any
  userTypesCombo:any
  foreignCombo:any
  foreignData:any
  selectedData:any
  parentCombo:any
  secondParentCombo:any
  modulos:any = []
  idRol=+localStorage.getItem('currentRolId');
  Agregar = +localStorage.getItem('permisoAgregar')
  Modificar = +localStorage.getItem('permisoModificar')
  Eliminar = +localStorage.getItem('permisoEliminar')
  Mostrar = +localStorage.getItem('permisoMostrar')
  public rowsOnPage = 5;
  public search:any
  Data:any
  private basePath:string = path.path
  dateToday:any
  yearToday:any
  dropdownList = [];
  selectedItem = [];
  selectedItems = [];
  dropdownSettings = [];

  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsuariosService
  ) { }

  date(dat){
    let date = new Date();
    let beginDate = date.getFullYear()
    this.dateToday = beginDate - (dat.substring(0,4))
  }
    ngOnInit() {
      let date = new Date();
      this.yearToday = date.getFullYear()+'-'+((date.getMonth()>9)?date.getMonth():'0'+date.getMonth())+'-'+((date.getDay()>9)?date.getDay():'0'+date.getDay())
      this.date(this.yearToday);

      this.cargarUsers()
      this.userService.getTypes()
                        .then(response => {
                          this.userTypesCombo = response
                        }).catch(error => {
                          console.clear
                          this.createError(error)
                        })
    }

    cargarUsers(){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.userService.getAll()
                        .then(response => {
                          this.userTable = response
                          $('#Loading').css('display','none')
                          console.clear
                        }).catch(error => {
                          console.clear
                          $('#Loading').css('display','none')
                          this.createError(error)
                        })
    }


    cargarUser(id:number){
      this.userService.getSingle(id)
                        .then(response => {

                          this.selectedData = response;
                          let now = response.nacimiento;
                          this.date(now)
                          // console.log(response);

                        }).catch(error => {
                          console.clear
                          this.createError(error)
                        })
    }
    updateUser(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.userService.update(formValue)
                        .then(response => {
                          this.cargarUsers()
                          console.clear
                          $("#editModal .close").click();
                          this.create('Usuario Actualizado exitosamente')
                          $('#Loading').css('display','none')

                        }).catch(error => {
                          console.clear
                          $('#Loading').css('display','none')
                          this.createError(error)
                        })

    }
    deleteUser(id:string){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      if(confirm("¿Desea Eliminar el USuario?")){
      this.userService.delete(id)
                        .then(response => {
                          this.cargarUsers()
                          console.clear
                          this.create('Usuario Eliminado exitosamente')
                          $('#Loading').css('display','none')

                        }).catch(error => {
                          console.clear
                          $('#Loading').css('display','none')
                          this.createError(error)
                        })
      }else{
        $('#Loading').css('display','none')
      }

    }
    insertUser(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')

      let pass = this.generar(25)
      // console.log(data)
      this.userService.create(formValue)
                        .then(response => {
                          this.cargarUsers()
                          console.clear
                          this.create('Usuario Ingresado')
                          $("#insertModal .close").click();
                          $('#Loading').css('display','none')
                          $('#insert-form')[0].reset()

                        }).catch(error => {
                          console.clear
                          $('#Loading').css('display','none')
                          this.createError(error)
                        })


    }
    generar(longitud)
    {
      let i:number
      var caracteres = "123456789+/-*abcdefghijkmnpqrtuvwxyz123456789+/-*ABCDEFGHIJKLMNPQRTUVWXYZ12346789+/-*";
      var contraseña = "";
      for (i=0; i<longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
      return contraseña;
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
