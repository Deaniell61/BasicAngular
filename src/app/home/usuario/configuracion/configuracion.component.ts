import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { UsuariosService } from "./../../admin/_services/usuarios.service";
import { NotificationsService } from 'angular2-notifications';

declare var $: any
import { path } from "../../../config.module";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  userTable:any
  userTypesCombo:any
  foreignCombo:any
  foreignData:any
  selectedUser:any
  selectedUserId:any = localStorage.getItem('currentId');
  public rowsOnPage = 5;
  public search:any
  Data:any
  private basePath:string = path.path
  dateToday:any

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

  subirImagenes(archivo,form,id){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    var archivos=archivo.srcElement.files;
    let url = `${this.basePath}/api/users/upload/${form.id}`

    var i=0;
    var size=archivos[i].size;
    var type=archivos[i].type;
        if(size<(5*(1024*1024))){
          if(type=="image/png" || type=="image/jpeg" || type=="image/jpg"){
        $("#"+id).upload(url,
            {
              avatar: archivos[i]
          },
          function(respuesta)
          {
            $('#imgAvatar').attr("src",'')
            $('#imgAvatar').attr("src",respuesta.picture)
            $('#Loading').css('display','none')
            localStorage.setItem('currentPicture', respuesta.picture);
            $("#"+id).val('')
            $("#barra_de_progreso").val(0)
          },
          function(progreso, valor)
          {

            $("#barra_de_progreso").val(valor);
          }
        );
          }else{
            this.createError("El tipo de imagen no es valido")
            $('#Loading').css('display','none')
          }
      }else{
        this.createError("La imagen es demaciado grande")
        $('#Loading').css('display','none')
      }
  }

  subirImagenes1(archivo,form,id){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    var archivos=archivo.srcElement.files;
    let url = `${this.basePath}/api/users/upload/pic1/${form.id}`

    var i=0;
    var size=archivos[i].size;
    var type=archivos[i].type;
        if(size<(5*(1024*1024))){
          if(type=="image/png" || type=="image/jpeg" || type=="image/jpg"){
        $("#"+id).upload(url,
            {
              avatar: archivos[i]
          },
          function(respuesta)
          {
            $('#imgAvatarPic1').attr("src",'')
            $('#imgAvatarPic1').attr("src",respuesta.pic1)
            $('#Loading').css('display','none')
            $("#"+id).val('')
            $("#barra_de_progresoPic1").val(0)
          },
          function(progreso, valor)
          {

            $("#barra_de_progresoPic1").val(valor);
          }
        );
          }else{
            this.createError("El tipo de imagen no es valido")
            $('#Loading').css('display','none')
          }
      }else{
        this.createError("La imagen es demaciado grande")
        $('#Loading').css('display','none')
      }
  }

  subirImagenes2(archivo,form,id){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    var archivos=archivo.srcElement.files;
    let url = `${this.basePath}/api/users/upload/pic2/${form.id}`

    var i=0;
    var size=archivos[i].size;
    var type=archivos[i].type;
        if(size<(5*(1024*1024))){
          if(type=="image/png" || type=="image/jpeg" || type=="image/jpg"){
        $("#"+id).upload(url,
            {
              avatar: archivos[i]
          },
          function(respuesta)
          {
            $('#imgAvatarPic2').attr("src",'')
            $('#imgAvatarPic2').attr("src",respuesta.pic2)
            $('#Loading').css('display','none')
            $("#"+id).val('')
            $("#barra_de_progresoPic2").val(0)
          },
          function(progreso, valor)
          {

            $("#barra_de_progresoPic2").val(valor);
          }
        );
          }else{
            this.createError("El tipo de imagen no es valido")
            $('#Loading').css('display','none')
          }
      }else{
        this.createError("La imagen es demaciado grande")
        $('#Loading').css('display','none')
      }
  }

  subirImagenes3(archivo,form,id){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    var archivos=archivo.srcElement.files;
    let url = `${this.basePath}/api/users/upload/pic3/${form.id}`

    var i=0;
    var size=archivos[i].size;
    var type=archivos[i].type;
        if(size<(5*(1024*1024))){
          if(type=="image/png" || type=="image/jpeg" || type=="image/jpg"){
        $("#"+id).upload(url,
            {
              avatar: archivos[i]
          },
          function(respuesta)
          {
            $('#imgAvatarPic3').attr("src",'')
            $('#imgAvatarPic3').attr("src",respuesta.pic3)
            $('#Loading').css('display','none')
            $("#"+id).val('')
            $("#barra_de_progresoPic3").val(0)
          },
          function(progreso, valor)
          {

            $("#barra_de_progresoPic3").val(valor);
          }
        );
          }else{
            this.createError("El tipo de imagen no es valido")
            $('#Loading').css('display','none')
          }
      }else{
        this.createError("La imagen es demaciado grande")
        $('#Loading').css('display','none')
      }
  }

    ngOnInit() {

      this.cargarUser(this.selectedUserId)
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
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.userService.getSingle(id)
                        .then(response => {
                          this.selectedUser = response;
                          let now = response.birthday;
                          if(now){
                            this.date(now)
                          }
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear
                          $('#Loading').css('display','none')
                          this.createError(error)
                        })
    }
    updateUser(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')

      //console.log(data)
      this.userService.update(formValue)
                        .then(response => {
                          this.cargarUsers()
                          console.clear
                          this.create('Usuario Actualizado exitosamente')
                          $('#Loading').css('display','none')

                        }).catch(error => {
                          console.clear
                          $('#Loading').css('display','none')
                          this.createError(error)
                        })

    }
    updatePass(formValue:any){
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')



      let data = {
        id: this.selectedUserId,
        old_pass: formValue.old_pass,
        new_pass: formValue.new_pass,
        new_pass_rep: formValue.new_pass2
      }
      //console.log(data)
      this.userService.updatePass(data)
                        .then(response => {
                          console.clear
                          this.create('Usuario Actualizado exitosamente')
                          $('#Loading').css('display','none')

                          $('#passChange-form')[0].reset()

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
