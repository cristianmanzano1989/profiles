import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PerfilesService } from 'src/app/services/perfiles.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   banderaSesion = true;
   usuario: Usuario;

  constructor(private perfilesService: PerfilesService, private route: Router) {

    console.log(this.perfilesService.usuarios);
    this.usuario = new Usuario('', '');
  }


  guardar() {

    // Verifica si esta iniciando sesion o esta registrando un nuevo usuario
    if (this.banderaSesion) {
      // Validaciones para saber si el valor de retorno encontro el usuario y si la contraseña ingresada es correcta
      if (this.perfilesService.validarLogin(this.usuario) !== null) {
        let usuariol: Usuario;
        usuariol = this.perfilesService.validarLogin(this.usuario);
        Swal.fire({
          title: 'Usuario logueado',
          text: 'Usuario logueado correctamente',
          timer: 2000
        });
        this.route.navigateByUrl(`/home/${ usuariol.id }`);
      } else {
        Swal.fire({
          title: 'login incorrecto',
          text: 'usuario y/o  contraseña incorrectos',
          timer: 2000
        });
      }
    } else {
      if (this.usuario.correo === '' || this.usuario.contrasena === '') {
        Swal.fire({
          title: 'Completa lo campos',
          text: 'Falta el correo y/o contraseña',
          timer: 2000
        });
      }
      if (this.perfilesService.registrarUsuario(this.usuario)) {
        console.log('registrar', this.usuario);
        Swal.fire({
              title: 'Usuario registrado',
              text: 'Usuario registrado correctamente',
              timer: 2000
            });
        this.cambiar();
      } else {
        Swal.fire({
          title: 'Usuario ya existente',
          text: 'el usuario no se puedo registrar',
          timer: 2000
        });
      }
    }
  }

  cambiar() {
    if (this.banderaSesion) {
      this.banderaSesion = false;
    } else {
      this.banderaSesion = true;
    }
  }

}
