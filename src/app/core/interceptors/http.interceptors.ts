import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService, PulzoHubService } from '../services';
import { StorageService } from '../services/storage.service';
import Swal from 'sweetalert2';
import { environment as env } from 'src/environments/environment';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private storageService: StorageService,
    private pulzoHubService: PulzoHubService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.group(`[Interceptor] ${req.method} ${req.url}`);

    let user = this.storageService.decryptAndGetObject('user');
    const token = user.token;

    console.log('[Interceptor] User object:', user);
    console.log('[Interceptor] Token extraido:', token ? `${token.substring(0, 20)}...` : 'TOKEN UNDEFINED O VACIO');

    const routes: { [key: string]: string } = {
      'voz-ia-listar-voces': 'RedaccionApp',
      'video': env.nameAppHub,
      'video-status': env.nameAppHub
    };
    
    const urlParams = new URLSearchParams(req?.url.split('?')[1]);
    const param: string = urlParams.get('event') ?? '';
    let nameAppHub = routes[param];
    const pulzoHub = this.pulzoHubService.getPulzoHub();

    console.log('[Interceptor] URL completa:', req.url);
    console.log('[Interceptor] param (event):', param || 'PARAM VACIO - no viene ?event= en la URL');
    console.log('[Interceptor] nameAppHub resuelto:', nameAppHub ?? 'NO ENCONTRADO en routes');
    console.log('[Interceptor] pulzoHub:', pulzoHub || 'pulzoHub VACIO O NULL');

    if (param == undefined){
      nameAppHub = 'RedaccionApp';
      console.log('[Interceptor] param era undefined, nameAppHub forzado a RedaccionApp');
    }

    const isLoginOrLogout = req?.url.endsWith('login') || req?.url.endsWith('logout');
    console.log('[Interceptor] Condiciones para agregar headers:', {
      pulzoHub: !!pulzoHub,
      token: !!token,
      isLoginOrLogout
    });

    if (pulzoHub && token && !req?.url.endsWith('login') && !req?.url.endsWith('logout')) {
      const array: string[] = pulzoHub.substring(1, pulzoHub.length - 1).split(',');
      console.log('[Interceptor] Array pulzoHub parseado:', array);
      console.log(`[Interceptor] Buscando "${nameAppHub}" en el array...`);

      let headerEnviado = false;
      for (const item of array) {
        if (item.includes(nameAppHub) || item.includes(nameAppHub)) {
          const pulzoHubHeader = item.substring(1, item.length - 1);
          console.log('[Interceptor] Match encontrado. pulzohub header:', pulzoHubHeader);
          console.log('[Interceptor] Authorization header:', `Bearer ${token.substring(0, 20)}...`);
          req = req.clone({
            setHeaders: {
              'pulzohub': pulzoHubHeader,
              Authorization: `Bearer ${token}`,
            },
          });
          headerEnviado = true;
          break;
        }
      }

      if (!headerEnviado) {
        console.warn(`[Interceptor] ADVERTENCIA: ningún item coincidió con "${nameAppHub}". Headers NO agregados. Posible 401/403.`);
      }
    } else {
      console.warn('[Interceptor] Headers NO agregados:', {
        pulzoHubFalsy: !pulzoHub,
        tokenFalsy: !token,
        isLoginOrLogout
      });
    }

    console.log('[Interceptor] Headers finales:', req.headers.keys().reduce((acc: any, key: string) => {
      acc[key] = key.toLowerCase() === 'authorization'
        ? `Bearer ${req.headers.get(key)?.split(' ')[1]?.substring(0, 20)}...`
        : req.headers.get(key);
      return acc;
    }, {}));
    console.groupEnd();

    return (next as any).handle(req).pipe(catchError((err) => this.handleError(err, req)));
  }

  private redirectToLogin(): void {
    this.removeItems()
    window.open(`${env.cerberoFrontURL}/login`, '_self');
  }

  private removeItems(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.pulzoHubService.removePulzoHub();
  }

  private handleError(err: any, req: any): any {
    console.group(`[Interceptor Error] Status ${err.status} en ${req.url}`);
    console.log('[Interceptor Error] Status:', err.status);
    console.log('[Interceptor Error] URL:', req.url);
    console.log('[Interceptor Error] Headers enviados:', req.headers.keys().reduce((acc: any, key: string) => {
      acc[key] = key.toLowerCase() === 'authorization'
        ? `Bearer ${req.headers.get(key)?.split(' ')[1]?.substring(0, 20)}...`
        : req.headers.get(key);
      return acc;
    }, {}));
    console.log('[Interceptor Error] Respuesta del servidor:', err.error);
    console.log('[Interceptor Error] Mensaje:', err.error?.error?.message || err.message || 'Sin mensaje');

    if (err.status === 401) console.warn('[Interceptor Error] 401 - Token invalido, expirado o header Authorization ausente');
    if (err.status === 403) console.warn('[Interceptor Error] 403 - Token valido pero sin permisos. Revisar pulzohub header');
    if (err.status === 404) console.warn('[Interceptor Error] 404 - Recurso no encontrado. Revisar URL y parametros');
    console.groupEnd();

    if (err.status === 404) {
      this.router.navigate(['/not-found']);
      return throwError(() => err);
    }
    if (err.status === 500) {
      this.router.navigate(['/internal-server']);
      return throwError(() => err);
    }

    Swal.fire('', err.error.error.message || 'Ocurrió un error inesperado', 'error');
    return throwError(() => err);
  }
}