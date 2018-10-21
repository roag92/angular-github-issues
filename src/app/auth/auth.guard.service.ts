import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const result = this.authService.isAuthenticated();
    if (result === false) {
      this.router.navigate(['/auth']);
    } else {
      const childrenRoute = route.children;
      if (childrenRoute.length === 0) {
        localStorage.setItem('redirect', 'true');
      }
    }
    return result;
  }

  canLoad(route: Route): boolean {
    return this.authService.isAuthenticated();
  }
}
