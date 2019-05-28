import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ImageCropperModule } from 'ngx-image-cropper';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
// Routes
import { APPROUTING } from './app.routes';
import { PerfilesComponent } from './components/perfiles/perfiles.component';
import { ExperienciaDetailComponent } from './components/experiencia-detail/experiencia-detail.component';
import { VerPerfilComponent } from './components/ver-perfil/ver-perfil.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    PerfilesComponent,
    ExperienciaDetailComponent,
    VerPerfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APPROUTING,
    RouterModule,
    SweetAlert2Module.forRoot(),
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
