import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EntregablesComponent } from './pages/admin/entregables/entregables.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './pages/admin/usuarios/crear-usuario/crear-usuario.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { EditarEntregablesComponent } from './pages/admin/entregables/editar-entregables/editar-entregables.component';
import { EliminarEntregablesComponent } from './pages/admin/entregables/eliminar-entregables/eliminar-entregables.component';
import { CrearEntregableComponent } from './pages/admin/entregables/crear-entregable/crear-entregable.component';
import { DetallesComponent } from './pages/admin/entregables/detalles/detalles.component';
import { ProyectosComponent } from './pages/admin/proyectos/proyectos.component';
import { RolesComponent } from './pages/admin/roles/roles.component';
import { CrearproyectoComponent } from './pages/admin/proyectos/crearproyecto/crearproyecto.component';
import { EditarproyectosComponent } from './pages/admin/proyectos/editarproyectos/editarproyectos.component';
import { DetallesproyectoComponent } from './pages/admin/proyectos/detallesproyecto/detallesproyecto.component';
import { BuscarComponent } from './pages/admin/buscar/buscar.component';
import { OlvidarContrasenaComponent } from './pages/inicio-sesion/olvidar-contrasena/olvidar-contrasena.component';
import { RestablecerContrasenaComponent } from './pages/inicio-sesion/restablecer-contrasena/restablecer-contrasena.component';
import { ContrasenaComponent } from './pages/inicio-sesion/contrasena/contrasena.component';
import { EmisionCertificadoComponent } from './pages/emision-certificado/emision-certificado.component';
import { CertificadoComponent } from './pages/emision-certificado/certificado/certificado.component';
import { SubirEntregablesComponent } from './pages/admin/entregables/subir-entregables/subir-entregables.component';
import { GenerarReporteComponent } from './pages/admin/entregables/generar-reporte/generar-reporte.component';
import { GenerarAvanceComponent } from './pages/admin/entregables/generar-avance/generar-avance.component';
import { AdminGuardService } from './services/admin-guard.service';
import { ActividadPmComponent } from './pages/admin/proyectos/actividad-pm/actividad-pm.component';
import { ActividadSiComponent } from './pages/admin/proyectos/actividad-si/actividad-si.component';
import { ProcesosComponent } from './pages/admin/proyectos/procesos/procesos.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AdminGuardService] },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuardService] },
  { path: 'entregables/:idProyecto/:idActividad', component: EntregablesComponent, canActivate: [AdminGuardService] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuardService] },
  { path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [AdminGuardService] },
  { path: 'editar-entregables/:id', component: EditarEntregablesComponent, canActivate: [AdminGuardService] },
  { path: 'eliminar-entregables', component: EliminarEntregablesComponent },
  { path: 'crear-entregable/:idProyecto/:idActividad', component: CrearEntregableComponent, canActivate: [AdminGuardService] },
  { path: 'detalles/:id', component: DetallesComponent, canActivate: [AdminGuardService] },
  { path: 'proyectos', component: ProyectosComponent, canActivate: [AdminGuardService] },
  { path: 'roles', component: RolesComponent, canActivate: [AdminGuardService] },
  { path: 'crearproyecto', component: CrearproyectoComponent, canActivate: [AdminGuardService] },
  { path: 'editarproyectos/:id', component: EditarproyectosComponent, canActivate: [AdminGuardService] },
  { path: 'detallesproyecto/:id', component: DetallesproyectoComponent, canActivate: [AdminGuardService] },
  { path: 'buscar', component: BuscarComponent, canActivate: [AdminGuardService] },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'olvidar-contrasena', component: OlvidarContrasenaComponent, canActivate: [AdminGuardService] },
  { path: 'restablecer-contrasena', component: RestablecerContrasenaComponent, canActivate: [AdminGuardService] },
  { path: 'contrasena', component: ContrasenaComponent, canActivate: [AdminGuardService] },
  { path: 'generar-reporte/:idProyecto/:idActividad', component: GenerarReporteComponent, canActivate: [AdminGuardService] },
  { path: 'emision-certificado', component: EmisionCertificadoComponent, canActivate: [AdminGuardService] },
  { path: 'certificado/:idProyecto/:idActividad', component: CertificadoComponent, canActivate: [AdminGuardService] },
  { path: 'subir-entregables', component: SubirEntregablesComponent, canActivate: [AdminGuardService] },
  { path: 'generar-avance/:idProyecto/:idActividad', component: GenerarAvanceComponent, canActivate: [AdminGuardService] },
  { path: 'actividad-pm/:idProyecto', component: ActividadPmComponent, canActivate: [AdminGuardService] },
  { path: 'actividad-si/:idProyecto', component: ActividadSiComponent, canActivate: [AdminGuardService] },
  { path: 'procesos/:idProyecto', component: ProcesosComponent, canActivate: [AdminGuardService] },

  { path: 'not-found', component: NotFoundComponent },



  { path: '**', pathMatch: 'full', redirectTo: 'not-found' }
];
