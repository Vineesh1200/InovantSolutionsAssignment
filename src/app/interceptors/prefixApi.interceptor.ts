import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

export const prefixApiInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const ANGULAR_BASE_URL = environment.apiUrl;

  if (!req.url.includes("http:") && !req.url.includes("https:")) {
    req = req.clone({
      url: ANGULAR_BASE_URL + req.url
    })
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.message));
    })
  );

};
