import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';

import { AuthService } from '../services';
import { DataSharingService } from '../services/data-sharing.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private dataSharingService: DataSharingService, private storageService: StorageService) {}

  postAdminData() {
    this.dataSharingService.postCrossDomainMessage();
  }

  sendAppNameToCerberoFront() {
    const iframe = document.createElement('IFRAME');
    iframe.id = 'admin-ifr';
    iframe.style.display = "none";
    (<HTMLIFrameElement>iframe).src = env.cerberoFrontURL;
    document.body.appendChild(iframe);
    this.postAdminData();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let user = this.storageService.decryptAndGetObject('user');

    if (user?.user) {
      user = user.user;
    }

    //console.log('Guard', user);

    if (user && user?.role && next.data['role'] && !next.data['role'].includes(user.role)) {
      this.sendAppNameToCerberoFront();
      return false;
    }

    if (user && user.accounType) {
      if (next.data['type'] && !next.data['type'].includes(user.accounType)) {
        this.sendAppNameToCerberoFront();
        return false;
      }
    }

    if (user && user.account_type) {
      if (next.data['type'] && !next.data['type'].includes(user.account_type)) {
      this.sendAppNameToCerberoFront();
      return false;
      }
    }

    if (!user || (state.url?.includes('admin') && user?.role !== 'Admin')) {
      this.sendAppNameToCerberoFront();
      return false;
    }

    return true;
  }
}
