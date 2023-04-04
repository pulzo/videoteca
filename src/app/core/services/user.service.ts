import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/models';
import { environment as env } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${env.apiCerberoUrl}`;
  private _user: User | null = null;

  constructor(private http: HttpClient) {}

  //LISTAR USUARIOS CON PAGINACIÓN (2)
  getUsers(page: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api-hermes/users/${page}`);
  }

  //MOSTRAR INFORMACION DE UN USUARIO (6)
  getUser(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api-hermes/user/${email}`);
  }

  //CREAR INFORMACION DE USUARIO (8)
  create(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api-hermes/user`, user);
  }

  //ACTUALIZAR INFORMACION DE UN USUARIO (7)
  update(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api-hermes/user`, user);
  }

  //ASIGNAR TIPO DE CUENTA (3)
  updateAccountType(user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api-hermes/partner/assign-account-type`, user);
  }

  //ACTIVAR USUARIO (4)
  activeUser(user: any) {
    return this.http.put<any>(`${this.baseUrl}/api-hermes/user/active`, user);
  }

  //DESACTIVAR USUARIO (5)
  disableUser(user: any) {
    return this.http.put<any>(`${this.baseUrl}/api-hermes/user/inactive`, user);
  }

  //SERVICIO PARA BUSCAR USUARIOS (29)
  searchUsers(data: any) {
    const param = 'criteria=' + data['criteria'];
    //console.log('par', `${this.baseUrl}/api-hermes/users/search?${param}`);
    return this.http.get<any>(`${this.baseUrl}/api-hermes/users/search?${param}`);
  }
}
