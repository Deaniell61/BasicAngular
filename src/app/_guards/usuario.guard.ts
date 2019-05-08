import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class UsuarioGuard implements CanActivate {

  constructor(private router: Router) { }

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentType')=='usuario') {
          return true;
        }

        if (localStorage.getItem('currentType')=='empresa') {
          this.router.navigate(['home/empresa']);
        }

        if (localStorage.getItem('currentType')=='cliente') {
          this.router.navigate(['home/cliente']);
        }

        if (localStorage.getItem('currentType')=='admin') {
          this.router.navigate(['home/admin']);
        }


            // not logged in so redirect to login page with the return url




      }
}
