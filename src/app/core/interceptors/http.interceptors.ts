import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services';
import Swal from 'sweetalert2';
import { StorageService } from '../services/storage.service';
import { environment as env } from 'src/environments/environment';
import { PulzoHubService } from '../services';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private pulzoHubService: PulzoHubService, private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = this.storageService.decryptAndGetObject('user');
    const token = user.token;
    const nameAppHub = env.nameAppHub;
    const pulzoHub = this.pulzoHubService.getPulzoHub();

    if (pulzoHub && token && !req?.url.endsWith('login') && !req?.url.endsWith('logout')) {
      const array: string[] = pulzoHub.substring(1, pulzoHub.length - 1).split(',');
      for (const item of array) {
        if (item.includes(nameAppHub)) {
          req = req.clone({
            setHeaders: {
              'pulzohub': item.substring(1, item.length - 1),
              Authorization: `Bearer ${token}`,
            },
          });
          break;
        }
      }
    }
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
    //console.log(err);
    if (err.status === 401) {
      this.redirectToLogin();
      return throwError(() => err);
    }
    if (err.status === 404) {
      this.redirectToLogin();
      return throwError(() => err);
    }
    if (err.status === 500) {
      this.redirectToLogin();
      return throwError(() => err);
    }

    Swal.fire('', err.error.error.message, 'error');
    return throwError(() => err);
  }
}
