import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from './conf';

@Injectable({
    providedIn: 'root'
})
export class ControlService {

    constructor(private http: HttpClient) { }

    start(): void {
        this.callApi('start');
    }

    stop(): void {
        this.callApi('stop');
    }

    update(): void {
        this.callApi('update');
    }

    private callApi(endpoint: string): void {
        this.http.post(`${Config.BASE_URL}${endpoint}`, {})
            .subscribe(() => {
            });
    }
}
