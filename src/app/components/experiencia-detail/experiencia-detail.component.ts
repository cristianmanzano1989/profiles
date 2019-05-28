import { Component, OnInit } from '@angular/core';
import { PerfilesService } from '../../services/perfiles.service';
import { ExperienciaLaboral } from '../../models/experiencia.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia-detail',
  templateUrl: './experiencia-detail.component.html',
  styleUrls: ['./experiencia-detail.component.css']
})
export class ExperienciaDetailComponent implements OnInit {

  experienciaDetalle: ExperienciaLaboral;
  idusuario: string;
  idexperiencia: string;
  usuarioe: Usuario;
  constructor(private perfilesService: PerfilesService, private activatedRoute: ActivatedRoute, private router: Router) {
    // Inicializamos una instancia de la clase Experiencia Laboral
    this.experienciaDetalle = new ExperienciaLaboral();
    // Estraemos el id del usuario de la ruta para luego obtener el usuario logueado
    this.idusuario = this.activatedRoute.snapshot.paramMap.get('id');

    this.idexperiencia = this.activatedRoute.snapshot.paramMap.get('idExp');

    if ( this.idexperiencia !== null) {
      this.experienciaDetalle = this.perfilesService.getExperiencia(this.idusuario, this.idexperiencia);
    }


  }

  ngOnInit() {
  }

  /**
   * funcion para guardar una nueva experiencia o editar una ya existente
   */
  guardarExperiencia() {
    if ( this.idexperiencia === null) {
      this.usuarioe = this.perfilesService.getUsuario(this.idusuario);
      if (this.perfilesService.guardarExperiencia(this.usuarioe, this.experienciaDetalle)) {
        Swal.fire({
          title: 'Experiencia guardada',
          text: 'Datos guardados correctamente',
          timer: 2000
        });
        this.router.navigate(['/home', this.idusuario]);
      } else {
        Swal.fire({
          title: 'Error al guardar la experiencia',
          text: 'Datos guardados incorrectamente',
          timer: 2000
        });
      }
    } else {
      this.usuarioe = this.perfilesService.getUsuario(this.idusuario);
      if (this.perfilesService.editarExperiencia(this.usuarioe, this.experienciaDetalle)) {
        Swal.fire({
          title: 'Experiencia guardada',
          text: 'Datos guardados correctamente',
          timer: 2000
        });
      } else {
        Swal.fire({
          title: 'Error al guardar la experiencia',
          text: 'Datos guardados incorrectamente',
          timer: 2000
        });
      }
    }

  }

}
