import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { PulzoHubService } from './pulzo-hub.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${env.apiCerberoUrl}`;
  private _user: User | null = null;

  constructor(private http: HttpClient, private router: Router, private pulzoHubService: PulzoHubService, private storageService: StorageService) {}

  get user(): User | null {
    return this._user;
  }

  set user(user: User | null) {
    this.storageService.encryptAndSaveObject('user', user);
    if (user?.token) {
      this.storageService.encryptAndSaveObject('token', user?.token);
    }
    
    this._user = user;
  }

  isAuthenticated() {
    return !!this._user;
  }

  public getUserLogged(){
    return this.storageService.decryptAndGetObject('user').email;
  }

  logout() {
    this.user = null;
    this.http.get<any>(`${this.baseUrl}/logout`);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.pulzoHubService.removePulzoHub();
    //localStorage.clear();
    //localStorage.empty();
    // this.router.navigate(['/login']);
    window.open(`${env.cerberoFrontURL}/home`, '_self');
  }
}
