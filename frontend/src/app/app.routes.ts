import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EntregablesComponent } from './pages/admin/entregables/entregables.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './pages/admin/usuarios/crear-usuario/crear-usuario.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { CrearEntregableComponent } from './pages/admin/entregables/crear-entregable/crear-entregable.component';
import { DetallesComponent } from './pages/admin/entregables/detalles/detalles.component';
import { ProyectosComponent } from './pages/admin/proyectos/proyectos.component';
import { CrearproyectoComponent } from './pages/admin/proyectos/crearproyecto/crearproyecto.component';
import { DetallesproyectoComponent } from './pages/admin/proyectos/detallesproyecto/detallesproyecto.component';
import { CertificadoComponent } from './pages/emision-certificado/certificado/certificado.component';
import { SubirEntregablesComponent } from './pages/admin/entregables/subir-entregables/subir-entregables.component';
import { GenerarReporteComponent } from './pages/admin/entregables/generar-reporte/generar-reporte.component';
import { GenerarAvanceComponent } from './pages/admin/entregables/generar-avance/generar-avance.component';
import { AdminGuardService } from './services/admin-guard.service';
import { ActividadPmComponent } from './pages/admin/proyectos/actividad-pm/actividad-pm.component';
import { ActividadSiComponent } from './pages/admin/proyectos/actividad-si/actividad-si.component';
import { ProcesosComponent } from './pages/admin/proyectos/procesos/procesos.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// import { EditarEntregablesComponent } from './pages/admin/entregables/editar-entregables/editar-entregables.component';
// import { EliminarEntregablesComponent } from './pages/admin/entregables/eliminar-entregables/eliminar-entregables.component';
// import { RolesComponent } from './pages/admin/roles/roles.component';
// import { EditarproyectosComponent } from './pages/admin/proyectos/editarproyectos/editarproyectos.component';
// import { BuscarComponent } from './pages/admin/buscar/buscar.component';
// import { OlvidarContrasenaComponent } from './pages/inicio-sesion/olvidar-contrasena/olvidar-contrasena.component';
// import { RestablecerContrasenaComponent } from './pages/inicio-sesion/restablecer-contrasena/restablecer-contrasena.component';
// import { ContrasenaComponent } from './pages/inicio-sesion/contrasena/contrasena.component';
// import { EmisionCertificadoComponent } from './pages/emision-certificado/emision-certificado.component';
export const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AdminGuardService] },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Inicio' },
  },
  {
    path: 'crear-usuario',
    component: CrearUsuarioComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Crear usuario' }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Usuarios' }
  },
  {
    path: 'crearproyecto',
    component: CrearproyectoComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Crear proyecto' }
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Proyectos' }
  },
  {
    path: 'detallesproyecto/:idProyecto',
    component: DetallesproyectoComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Detalles proyecto' }
  },
  {
    path: 'procesos/:idProyecto',
    component: ProcesosComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Procesos' }
  },
  {
    path: 'actividad-pm/:idProyecto',
    component: ActividadPmComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Actividad PM' }
  },
  {
    path: 'actividad-si/:idProyecto',
    component: ActividadSiComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Actividad SI' }
  },
  {
    path: 'entregables/:idProyecto/:idActividad',
    component: EntregablesComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Entregables' }
  },
  {
    path: 'detalles/:idProyecto',
    component: DetallesComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Detalles' }
  },
  {
    path: 'crear-entregable/:idProyecto/:idActividad',
    component: CrearEntregableComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Crear Entregable' }
  },
  {
    path: 'subir-entregables',
    component: SubirEntregablesComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Subir Entregables' }
  },
  {
    path: 'certificado/:idProyecto/:idActividad',
    component: CertificadoComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Certificado' }
  },
  {
    path: 'generar-reporte/:idProyecto/:idActividad',
    component: GenerarReporteComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Generar Reporte' }
  },
  {
    path: 'generar-avance/:idProyecto/:idActividad',
    component: GenerarAvanceComponent,
    canActivate: [AdminGuardService],
    data: { breadCrumb: 'Generar Avance' }
  },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  // { path: 'emision-certificado', component: EmisionCertificadoComponent, canActivate: [AdminGuardService] },
  // { path: 'buscar', component: BuscarComponent, canActivate: [AdminGuardService] },
  // { path: 'editar-entregables/:id', component: EditarEntregablesComponent, canActivate: [AdminGuardService] },
  // { path: 'eliminar-entregables', component: EliminarEntregablesComponent },
  // { path: 'editarproyectos/:id', component: EditarproyectosComponent, canActivate: [AdminGuardService] },
  // { path: 'roles', component: RolesComponent, canActivate: [AdminGuardService] },
  // { path: 'olvidar-contrasena', component: OlvidarContrasenaComponent, canActivate: [AdminGuardService] },
  // { path: 'restablecer-contrasena', component: RestablecerContrasenaComponent, canActivate: [AdminGuardService] },
  // { path: 'contrasena', component: ContrasenaComponent, canActivate: [AdminGuardService] },

  { path: 'not-found', component: NotFoundComponent },



  { path: '**', pathMatch: 'full', redirectTo: 'not-found' }
];
