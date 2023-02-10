import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let user =
      this.authService.user || sessionStorage.getItem('user')
        ? JSON.parse(<string>sessionStorage.getItem('user'))
        : null;

    if (user?.user) {
      user = user.user;
    }

    //console.log('Guard', user);

    if (user && user?.role && next.data['role'] && !next.data['role'].includes(user.role)) {
      this.router.navigateByUrl('/login');
      return false;
    }

    if (user && user.accounType) {
      if (next.data['type'] && !next.data['type'].includes(user.accounType)) {
        this.router.navigateByUrl('/login');
        return false;
      }
    }

    if (user && user.account_type) {
      if (next.data['type'] && !next.data['type'].includes(user.account_type)) {
        this.router.navigateByUrl('/login');
        return false;
      }
    }

    if (!user || (state.url?.includes('admin') && user?.role !== 'Admin')) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
