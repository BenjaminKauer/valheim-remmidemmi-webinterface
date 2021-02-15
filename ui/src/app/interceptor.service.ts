import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Config } from './conf';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Do not intercept Login route
        if (request.url === `${Config.BASE_URL}login`) {
            return next.handle(request);
        }

        console.log(request);
        const authHeaderValue: string = this.auth.getToken();

        request = request.clone({
            setHeaders: {
                Authorization: authHeaderValue
            }
        });
        return next.handle(request);
    }
}
