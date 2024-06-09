import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
 
  constructor(private loginService: LoginService, private router: Router) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
      return this.loginService.currentLoginOn.value ? true : this.router.createUrlTree(['/login']);
  }
}