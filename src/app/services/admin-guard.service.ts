import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    if  (userRole === 'Administrador' || userRole === 'Usuario') {
      return true;
    } else {
      this.router.navigate(['no-autorizado']);
      return false;
    }

  }
}
