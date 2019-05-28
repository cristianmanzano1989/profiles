import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ExperienciaDetailComponent } from './components/experiencia-detail/experiencia-detail.component';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { VerPerfilComponent } from './components/ver-perfil/ver-perfil.component';

const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:id', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'home/:id/exp', component: ExperienciaDetailComponent, canActivate: [AuthGuardService]},
  { path: 'home/:id/exp/:idExp', component: ExperienciaDetailComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'perfiles', component: PerfilesComponent },
  { path: 'perfil/:id', component: VerPerfilComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

export const APPROUTING = RouterModule.forRoot(ROUTES);
