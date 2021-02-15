import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Config } from './conf';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private password: string;
    private authenticated = false;

    constructor(private http: HttpClient) { }

    isAuthenticated(): Observable<boolean> {
        return of(this.authenticated);
    }

    getToken(): string {
        if (this.password) {
            return btoa(this.password);
        }
        return '';
    }

    login(password: string): void {

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', btoa(password));

        this.http.post(`${Config.BASE_URL}login`, {}, { headers })
            .subscribe(() => {
                this.password = password;
                this.authenticated = true;
            });
    }
}
