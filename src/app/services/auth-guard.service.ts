import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { PerfilesService } from './perfiles.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  usuarioEstado: Usuario;
  idusuarioEstado: string;
  constructor(private perfilesService: PerfilesService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.usuarioEstado = new Usuario('', '');
    // Se hace el llamado a la ruta activa para extraer el id del usuario de la ruta,
    // para luego buscar el usuario y comparar el estado de sesion
    this.idusuarioEstado = state.root.children[0].params.id;
    this.usuarioEstado = this.perfilesService.getUsuario(this.idusuarioEstado);
    console.log('CanActivate Usuario', this.usuarioEstado);
    if (this.usuarioEstado !== undefined) {
      if (this.usuarioEstado.estadosesion === true ) {
        console.log('Paso el Guard');
        return true;
      } else {
          console.error('Bloqueado por el guard');
          this.router.navigate(['/login']);
          return false;
      }
    } else {
        console.error('Bloqueado por el guard');
        this.router.navigate(['/login']);
        return false;
    }
  }
}
