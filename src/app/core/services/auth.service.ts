import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { PulzoHubService } from './pulzo-hub.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${env.apiUrl}`;
  private _user: User | null = null;

  get user(): User | null {
    return this._user;
  }

  set user(user: User | null) {
    sessionStorage.setItem('user', !!user ? JSON.stringify(user) : '');
    if (user?.token) {
      sessionStorage.setItem('token', user?.token);
    }
    
    this._user = user;
  }

  constructor(private http: HttpClient, private router: Router, private pulzoHubService: PulzoHubService) {}

  isAuthenticated() {
    return !!this._user;
  }


  login(email: string, password: string): Observable<User> {
    const formData: any = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post<any>(`${this.baseUrl}/login`, formData).pipe(
      map((data: any) => {
        if (!data || !data.email) {
          return { code: data.code, error: data.message };
        }
        const { ...user } = data;
       
        return {
          ...user,
        };
      })
    );
  }

  logout() {
    this.user = null;
    this.http.get<any>(`${this.baseUrl}/logout`);
    sessionStorage.removeItem('token');
    this.pulzoHubService.removePulzoHub();
    //sessionStorage.clear();
    //sessionStorage.empty();
    this.router.navigate(['/login']);
  }
}
