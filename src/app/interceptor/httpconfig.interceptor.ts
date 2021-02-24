import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SnackBarService } from '../services/snack-bar.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpconfigInterceptor implements HttpInterceptor {

  constructor(
    private snackBarService: SnackBarService,
    private router: Router,
  ) { }

  private getToken(): string {
    return localStorage.getItem('token');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error?.status === 401) {
          this.router.navigate(['login']);
        }
        if (error?.status === 400) {
          this.snackBarService.openSnackBar('לא מורשה');
        }
        return throwError(error);
      })
    );
  }
}
