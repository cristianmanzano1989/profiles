import { Component, OnInit } from '@angular/core';
import { PerfilesService } from '../../services/perfiles.service';
import { Usuario } from '../../models/usuario.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ExperienciaLaboral } from '../../models/experiencia.model';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  usuario: Usuario;
  experiencia: ExperienciaLaboral;
  public id: string;
  cambiarEstado = true;

  constructor(private perfilesService: PerfilesService, private activatedRoute: ActivatedRoute) {



    // Extraemos el id del usuario de la ruta para luego obtener el usuario logueado
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.usuario = this.perfilesService.getUsuario(this.id);
    // Valído si tiene experiencias para inicializar el array
    if (this.perfilesService.sinexperiencia  === true) {
      this.usuario.explaborales = [];
      this.perfilesService.guardarStorage();
    }
    // Inicializamos una instancia de la clase Experiencia Laboral
    this.experiencia = new ExperienciaLaboral();


  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  /**
   * funcion que llama el procedimiento para guardar el perfil de un usuario
   */
  guardarPerfil() {

    console.log('imagen', this.croppedImage);
    this.usuario.foto = this.croppedImage;

    if (this.perfilesService.guardarPerfil(this.usuario)) {
      Swal.fire({
        title: 'Perfil Guardado',
        text: 'Datos personales guardados correctamente',
        timer: 2000
      });
    } else {
      console.error();
      Swal.fire({
        title: 'Error al guardar el perfil',
        text: 'usuario y/o  contraseña incorrectos',
        timer: 2000
      });
    }
  }

  eliminarExperiencia(usuario: Usuario, experiencia: ExperienciaLaboral) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro desea eliminar la experiencia de la empresa ${experiencia.empresa}?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        if ( this.perfilesService.borrarExperiencia(usuario, experiencia)) {
          Swal.fire({
            title: 'Eliminar experiencia',
            text: 'Experiencia eliminada correctamente',
            timer: 2000
          });
        } else {
          Swal.fire({
            title: 'Eliminar experiencia',
            text: ' No se pudo eliminar la experiencia',
            timer: 2000
          });
        }
      }
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        title: 'Eliminar experiencia',
        text: ' Se presento un error inexperado',
        timer: 2000
      });
    });
  }
}
