import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EntregablesComponent } from './pages/admin/entregables/entregables.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
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

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'entregables', component: EntregablesComponent},
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuardService]},
    {path: 'inicio-sesion', component: InicioSesionComponent},
    {path: 'editar-entregables/:id', component: EditarEntregablesComponent, canActivate: [AdminGuardService]},
    {path: 'eliminar-entregables', component: EliminarEntregablesComponent},
    {path: 'crear-entregable', component: CrearEntregableComponent},
    {path: 'detalles/:id', component: DetallesComponent},
    {path: 'proyectos', component: ProyectosComponent},
    {path: 'roles', component: RolesComponent, canActivate: [AdminGuardService]},
    {path: 'crearproyecto', component: CrearproyectoComponent}, 
    {path: 'editarproyectos/:id', component: EditarproyectosComponent},
    {path: 'detallesproyecto/:id', component: DetallesproyectoComponent},
    {path: 'buscar', component: BuscarComponent},
    {path: 'inicio-sesion', component: InicioSesionComponent},
    {path: 'olvidar-contrasena', component: OlvidarContrasenaComponent},
    {path: 'restablecer-contrasena', component: RestablecerContrasenaComponent},
    {path: 'contrasena', component: ContrasenaComponent},
    {path: 'generar-reporte', component: GenerarReporteComponent},
    {path: 'emision-certificado', component: EmisionCertificadoComponent},
    {path: 'certificado', component: CertificadoComponent},
    {path: 'subir-entregables', component: SubirEntregablesComponent},
    {path: 'generar-avance', component: GenerarAvanceComponent},
    {path: 'actividad-pm/:id', component: ActividadPmComponent},
    {path: 'actividad-si/:id', component: ActividadSiComponent},
    {path: 'procesos/:id', component: ProcesosComponent},



    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
