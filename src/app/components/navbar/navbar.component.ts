import { Component, OnInit, Input } from '@angular/core';
import { PerfilesService } from 'src/app/services/perfiles.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() id: string;
  @Input() usuario: Usuario;



  constructor(private perfilesService: PerfilesService, private router: Router) {


    // Inicializamos un contador que cierra la sesión en media de manera automatica
     setTimeout(() => {
      this.logout();
      }, 1.8e+6);
   }

  ngOnInit() {
  }

  logout() {
    this.perfilesService.logout(this.id);
    this.router.navigate(['/login']);
  }

}
