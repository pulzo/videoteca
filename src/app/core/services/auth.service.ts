import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from 'src/app/models';

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

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated() {
    return !!this._user;
  }

  getUser(user: any): Observable<any> {
    //return of(user);
    if (user?.role !== 'Partner') {
      return of(user);
    }
    return this.http.get<any>(`${this.baseUrl}/api-hermes/user/${user?.email}`);
  }

  login(email: string, password: string): Observable<User> {
    const formData: any = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return this.http.post<any>(`${this.baseUrl}/login`, formData).pipe(
      map((data: any) => {
        if (!data || !data.email) {
          return { code: data.code, error: data.message };
          //return data.message === 'contraseña incorrecta' ? { error: 'WrongPassword' } : null;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { account_type, ...user } = data;
        console.log(data)
        return {
          ...user,
          accounType: data.account_type,
        };
      })
    );
  }

  logout() {
    this.user = null;
    this.http.get<any>(`${this.baseUrl}/logout`);
    sessionStorage.removeItem('token');
    //sessionStorage.clear();
    //sessionStorage.empty();
    this.router.navigate(['/login']);
  }
}
