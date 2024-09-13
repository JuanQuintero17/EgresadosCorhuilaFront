import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pantallas/login/login.component';
import { HomeComponent } from './pantallas/home/home.component';
import { DashboardComponent } from './pantallas/dashboard/dashboard.component';
import { ReporteComponent } from './pantallas/reporte/reporte.component';
import { ConfiguracionComponent } from './pantallas/configuracion/configuracion.component';
import { NoticiasComponent } from './pantallas/noticias/noticias.component';
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
import { LoginGuard } from './guards/login.guard';
import { HomeEgresadoGuard } from './guards/home-egresado.guard';
import { LoginAdminGuard } from './guards/login-admin.guard';
import { HomeAdminGuard } from './guards/home-admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [LoginAdminGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    //canActivate: [HomeAdminGuard],
    data: { expectedRoles : ['admin']},
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'reporte',
        component: ReporteComponent
      },
      {
        path: 'configuracion',
        component: ConfiguracionComponent
      },
      {
        path: 'noticias',
        component: NoticiasComponent
      }
    ]
  },
  {
    path: 'homeEgresado',
    component: HomeEgresadoComponent,
    canActivate: [HomeEgresadoGuard],
    data: { expectedRoles : ['egresado']},
    children: [
      {
        path: '',
        component: NoticiasEgresadoComponent,
      },
      {
        path: 'noticiasEgresado',
        component: NoticiasEgresadoComponent,
      },
      {
        path: 'noticiasInfo',
        component: NoticiasEgresadoInfoComponent
      },
      {
        path: 'actualizar',
        component: ActualizarEgresadoComponent,
      },
      {
        path: 'configuracionEgresado',
        component: ConfiguracionEgresadoComponent
      },
      {
        path: 'datosEducacion',
        component: DatosEducacionComponent
      },
      {
        path: 'datosLaborales',
        component: DatosLaboralesComponent
      },
    ]
  },
  {
    path: 'modalError',
    component: ModalErrorComponent
  },
  {
    path: 'modalCorreo',
    component: ModalCorreoComponent
  },
  {
    path: 'crearCuenta',
    component: CrearCuentaComponent
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
