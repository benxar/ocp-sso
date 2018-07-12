import {KeycloakService} from './keycloak.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {mergeMap} from 'rxjs/internal/operators';

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {

  constructor(public keycloakService: KeycloakService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.keycloakService.getAuth();

    if (auth.loggedIn) {
      return this.keycloakService.getToken()
          .pipe(
              mergeMap(res => {
                  request = request.clone({
                      setHeaders: {
                          Authorization: `Bearer ${res}`
                      }
                  });

                  return next.handle(request);
              })
          );
    } else {
      return next.handle(request);
    }
  }
}
