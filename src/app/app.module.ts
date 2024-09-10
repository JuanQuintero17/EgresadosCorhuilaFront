import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pantallas/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pantallas/home/home.component';
import { DashboardComponent } from './pantallas/dashboard/dashboard.component';
import { ReporteComponent } from './pantallas/reporte/reporte.component';
import { ConfiguracionComponent } from './pantallas/configuracion/configuracion.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ModalIndentificacionComponent } from './modals/modal-indentificacion/modal-indentificacion.component';
import { ModalErrorComponent } from './modals/modal-error/modal-error.component';
import { ModalCorreoComponent } from './modals/modal-correo/modal-correo.component';
import { AdminComponent } from './pantallas/admin/admin.component';
import { CrearCuentaComponent } from './pantallas/crear-cuenta/crear-cuenta.component';
import { HomeEgresadoComponent } from './pantallas/home-egresado/home-egresado.component';
import { NoticiasEgresadoComponent } from './pantallas/noticias-egresado/noticias-egresado.component';
import { ActualizarEgresadoComponent } from './pantallas/actualizar-egresado/actualizar-egresado.component';
import { ConfiguracionEgresadoComponent } from './pantallas/configuracion-egresado/configuracion-egresado.component';
import { DatosEducacionComponent } from './pantallas/datos-educacion/datos-educacion.component';
import { DatosLaboralesComponent } from './pantallas/datos-laborales/datos-laborales.component';
import { NoticiasEgresadoInfoComponent } from './pantallas/noticias-egresado-info/noticias-egresado-info.component';
import { UsersInterceptor } from './interceptors/users.interceptor';
import { NoticiasComponent } from './pantallas/noticias/noticias.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    DashboardComponent,
    ReporteComponent,
    ConfiguracionComponent,
    ModalIndentificacionComponent,
    ModalErrorComponent,
    ModalCorreoComponent,
    CrearCuentaComponent,
    HomeEgresadoComponent,
    NoticiasEgresadoComponent,
    ActualizarEgresadoComponent,
    ConfiguracionEgresadoComponent,
    DatosEducacionComponent,
    DatosLaboralesComponent,
    NoticiasEgresadoInfoComponent,
    NoticiasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
