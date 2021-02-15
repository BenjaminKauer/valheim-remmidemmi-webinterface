import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public password: string = '';

    constructor(public authService: AuthService) { }

    ngOnInit(): void {
    }

    login(): void {
        this.authService.login(this.password);
    }

}
