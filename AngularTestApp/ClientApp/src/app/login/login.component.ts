import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UserLogin } from '../user-login.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

    userLogin = new UserLogin();
    isLoading = false;
    formResetToggle = true;
    modalClosedCallback: () => void;
    loginStatusSubscription: any;

    @Input()
    isModal = false;


    constructor( private authService: AuthService) {

    }


    ngOnInit() {

        this.userLogin.rememberMe = true;

        if (this.getShouldRedirect()) {
            this.authService.redirectLoginUser();
        } else {
            this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
                if (this.getShouldRedirect()) {
                    this.authService.redirectLoginUser();
                }
            });
        }
    }


    ngOnDestroy() {
        if (this.loginStatusSubscription) {
            this.loginStatusSubscription.unsubscribe();
        }
    }


    getShouldRedirect() {
        return !this.isModal;
    }


    showErrorAlert(caption: string, message: string) {
        
    }

    closeModal() {
        if (this.modalClosedCallback) {
            this.modalClosedCallback();
        }
    }


    login() {
        this.isLoading = true;
        


    }


    offerAlternateHost() {

        
    }


    mapLoginErrorMessage(error: string) {

        if (error === 'invalid_username_or_password') {
            return 'Invalid username or password';
        }

        if (error === 'invalid_grant') {
            return 'This account has been disabled';
        }

        return error;
    }


    reset() {
        this.formResetToggle = false;

        setTimeout(() => {
            this.formResetToggle = true;
        });
    }
}