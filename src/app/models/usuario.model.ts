
import { ExperienciaLaboral } from './experiencia.model';

export class Usuario {
  id: number;
  correo: string;
  contrasena: string;
  nombres?: string;
  apellidos?: string;
  foto?: any;
  descripcion?: string;
  explaborales?: ExperienciaLaboral[];
  estadosesion?: boolean;

  constructor(correo: string, constrasena: string) {
    this.correo = correo;
    this.contrasena = constrasena;
    this.nombres = '';
    this.apellidos = '';
    this.descripcion = '';
    this.id = new Date().getTime();
    this.explaborales = [];
    this.estadosesion = false;
}
}


