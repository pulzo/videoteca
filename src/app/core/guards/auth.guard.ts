import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { DataSharingService } from '../services/data-sharing.service';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private dataSharingService: DataSharingService, 
    private storageService: StorageService
    ) {}

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

    if (!user ) {
      this.sendAppNameToCerberoFront();
      return false;
      
    }

    return true;
  }
}
