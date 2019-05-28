import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { PerfilesService } from '../../services/perfiles.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  public usuarios: Usuario[];
  constructor(private perfilesService: PerfilesService) {
    this.usuarios = this.perfilesService.usuarios;
    console.log(this.usuarios);

  }

  ngOnInit() {

  }

}
