import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ExperienciaLaboral } from 'src/app/models/experiencia.model';
import { PerfilesService } from 'src/app/services/perfiles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {

  selectedFile: File = null;
  usuario: Usuario;
  experiencia: ExperienciaLaboral;
  public id: string;
  cambiarEstado = true;
  constructor(private perfilesService: PerfilesService, private activatedRoute: ActivatedRoute) {
        // Estraemos el id del usuario de la ruta para luego obtener el usuario logueado
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

}
