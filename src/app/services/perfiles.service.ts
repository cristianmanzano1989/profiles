import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { ExperienciaLaboral } from '../models/experiencia.model';
@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  public autenticado: boolean;
  public sinexperiencia = true;
  public usuarios: Usuario[] = [];

  constructor() {
    this.cargarStorage();
  }

  /**
   *
   * @param usuario funcion que retorna y valida la sesion de un usuario que entra como parametro.
   */
  validarLogin(usuario: Usuario) {
    let usuariof: Usuario;
    // Validaciones para campos vacios
    if (usuario.correo === '' || usuario.contrasena === '') {
      return null;
    }

    // Busqueda del usuario por correo
    usuariof = this.usuarios.find( usuarioData => usuarioData.correo === usuario.correo);

    if (usuariof.contrasena === usuario.contrasena) {
      usuariof.estadosesion = true;
      this.guardarStorage();
      return usuariof;
    } else {
      return null;
    }

  }

  /**
   * procedimiento que cierra sesion de usuario
   */
  logout(id: string | number ) {
    let usuario: Usuario;
    usuario = this.getUsuario(id);
    usuario.estadosesion = false;
    this.guardarStorage();
    console.log('Logout', usuario.estadosesion);
  }

  /**
   *
   * @param usuario funcion que registra un nuevo usuario devuelve un valor verdaderto o false
   */
  registrarUsuario(usuario: Usuario): boolean {
    const nuevoUsuario = new Usuario(usuario.correo, usuario.contrasena);
    console.log(nuevoUsuario);

    this.usuarios.push(nuevoUsuario);
    this.guardarStorage();
    return true;
  }

  /**
   *
   * @param id funcion que retorna el usuario correspondiente a un id
   */
  getUsuario(id: string | number) {
    id = Number(id);
    console.log('id', id);
    console.log('usuarios', this.usuarios);
    return this.usuarios.find( usuarioData => usuarioData.id  === id);
  }

  /**
   * Funcion que devuelve una experiencia laboral de un usuario en específico
   * @parametro idusuario
   * @parametro idexperiencia
   */
  getExperiencia(idusuario: string | number , idexperiencia: string | number): ExperienciaLaboral {
    idusuario = Number(idusuario);
    idexperiencia = Number(idexperiencia);
    const usuarioexp = this.getUsuario(idusuario);
    let experienciaBusqueda: ExperienciaLaboral;

    experienciaBusqueda = usuarioexp.explaborales.find( expLablData => expLablData.id  === idexperiencia);

    if ( experienciaBusqueda !== null) {
      return experienciaBusqueda;
    } else {
      return null;
    }
  }

  /**
   * Funcion para borrar experiencia de un usuario especifico
   * @parametro idusuario
   * @parametro idexperiencia
   */
  borrarExperiencia(usuario: Usuario, expEliminar: ExperienciaLaboral): boolean {

    usuario.explaborales = usuario.explaborales.filter(expData => expData.id !== expEliminar.id);
    this.guardarStorage();
    return true;
  }
  /**
   *
   * @param usuario // Funcion para guardar la informacion personal de un perfil
   */
  guardarPerfil(usuario: Usuario) {
    let usuariobusqueda: Usuario;
    usuariobusqueda = this.usuarios.find( usuarioData => usuarioData.id  === usuario.id);
    usuariobusqueda = usuario;
    if ( usuariobusqueda !== null) {
      this.guardarStorage();
      return true;
    } else {
      return false;
    }
  }
  /**
   * Funcion que guarda una experiencia laboral para un usuario específico
   * @parametro usuario
   * @parametro experiencia
   */
  guardarExperiencia(usuario: Usuario , experiencia: ExperienciaLaboral): boolean {
    const usuariob: Usuario = this.getUsuario(usuario.id);
    console.log(usuariob);
    console.log('experiencia', experiencia);

    if (usuariob !== null) {
      usuariob.explaborales.push(experiencia);
      this.guardarStorage();
      return true;
    } else {
      return false;
    }

  }

  /**
   * Funcion que edita una experiencia laboral para un usuario específico
   * @parametro usuario
   * @parametro experiencia
   */
  editarExperiencia(usuario: Usuario , experiencia: ExperienciaLaboral): boolean {
    let experienciaBusqueda: ExperienciaLaboral;
    experienciaBusqueda = usuario.explaborales.find( expLablData => expLablData.id  === experiencia.id);
    console.log('experiencia busqueda', experienciaBusqueda);
    if ( experienciaBusqueda !== null) {
      experienciaBusqueda = experiencia;
      this.guardarStorage();
      return true;
    } else {
      return false;
    }

  }

  /**
   * Permite guardar los datos de los usuarios en el localStorage del navegador web
   */
  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.usuarios));
    localStorage.setItem('experiencia', JSON.stringify(this.sinexperiencia));
  }

  /**
   * Permite cargar los datos del localStorage de los usuarios y el estado del login del usuario
   */
  cargarStorage() {
    if (localStorage.getItem('data') || localStorage.getItem('experiencia')) {
     this.usuarios =  JSON.parse(localStorage.getItem('data'));
     this.sinexperiencia = JSON.parse(localStorage.getItem('experiencia'));
    } else {
      this.usuarios = [];
    }

  }


}
