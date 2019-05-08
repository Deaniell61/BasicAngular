import { Component, OnInit } from '@angular/core';
import { UsersTypesService } from "../_services/users-types.service";
import { NotificationsService } from 'angular2-notifications';
declare var $: any
@Component({
  selector: 'app-usuarios-tipo',
  templateUrl: './usuarios-tipo.component.html',
  styleUrls: ['./usuarios-tipo.component.css']
})
export class UsuariosTipoComponent implements OnInit {
  Table:any
  selectedData:any
  public rowsOnPage = 5;
  public search:any
  constructor(
    private _service: NotificationsService,
    private mainService: UsersTypesService
  ) { }

    ngOnInit() {

      this.cargarAll()
    }
    cargarAll(){
      this.mainService.getAll()
                        .then(response => {
                          this.Table = response
                          $("#editModal .close").click();
                          $("#insertModal .close").click();
                          console.clear()
                        }).catch(error => {
                          console.clear()
                          this.createError(error)
                        })
    }
    cargarSingle(id:number){
      this.mainService.getSingle(id)
                        .then(response => {
                          this.selectedData = response;
                        }).catch(error => {
                          console.clear()
                          this.createError(error)
                        })
    }
    update(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      //console.log(data)
      this.mainService.update(formValue)
                        .then(response => {
                          this.cargarAll()
                          console.clear()
                          this.create('Rol Actualizado exitosamente')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear()
                          $('#Loading').css('display','none')
                          this.createError(error)
                        })

    }
    delete(id:string){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.delete(id)
                        .then(response => {
                          this.cargarAll()
                          console.clear()
                          this.create('Rol Eliminado exitosamente')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear()
                          $('#Loading').css('display','none')
                          this.createError(error)
                        })

    }
    insert(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.mainService.create(formValue)
                        .then(response => {
                          this.cargarAll()
                          console.clear()
                          this.create('Rol Ingresado')
                          $('#Loading').css('display','none')
                          $('#insert-form #titulo').val('')
                          $('#insert-form #descripcion').val('')

                        }).catch(error => {
                          console.clear()
                          $('#Loading').css('display','none')
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
