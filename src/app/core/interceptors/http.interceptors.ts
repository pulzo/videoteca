import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services';
import Swal from 'sweetalert2';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user: any = localStorage.getItem('user') || '';
    if (user !== '') {
      user = JSON.parse(user);
    }
    const token = user.token;

    if (token && !req?.url.endsWith('login')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return (next as any).handle(req).pipe(catchError((err) => this.handleError(err, req)));
  }

  private handleError(err: any, req: any): any {
    //console.log(err);
    if (err.status === 401) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return throwError(() => err);
    }
    if (err.status === 404) {
      this.authService.logout();
      this.router.navigate(['/not-found']);
      return throwError(() => err);
    }
    if (err.status === 500) {
      this.authService.logout();
      this.router.navigate(['/internal-server']);
      return throwError(() => err);
    }

    Swal.fire('', err.error.error, 'error');
    return throwError(() => err);
  }
}
