import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
    public get loginUrl() { return "/login"; }
    public get homeUrl() { return "/home"; }

    public loginRedirectUrl: string;
    public logoutRedirectUrl: string;

    public reLoginDelegate: () => void;

    private previousIsLoggedInCheck = false;
    private loginStatus = new Subject<boolean>();

    constructor(
        private router: Router) {

        this.initializeLoginStatus();
    }

    private initializeLoginStatus() {
    }

    gotoPage(page: string, preserveParams = true) {

        const navigationExtras: NavigationExtras = {
            queryParamsHandling: preserveParams ? 'merge' : '', preserveFragment: preserveParams
        };

        this.router.navigate([page], navigationExtras);
    }

    gotoHomePage() {
        this.router.navigate([this.homeUrl]);
    }

    public static splitInTwo(text: string, separator: string): { firstPart: string, secondPart: string } {
        const separatorIndex = text.indexOf(separator);

        if (separatorIndex === -1) {
            return { firstPart: text, secondPart: null };
        }

        const part1 = text.substr(0, separatorIndex).trim();
        const part2 = text.substr(separatorIndex + 1).trim();

        return { firstPart: part1, secondPart: part2 };
    }

    public static getQueryParamsFromString(paramString: string) {
        if (!paramString) {
            return null;
        }

        const params: { [key: string]: string } = {};

        for (const param of paramString.split('&')) {
            const keyValue = AuthService.splitInTwo(param, '=');
            params[keyValue.firstPart] = keyValue.secondPart;
        }

        return params;
    }

    redirectLoginUser() {
        const redirect = this.loginRedirectUrl && this.loginRedirectUrl !== '/' ? this.loginRedirectUrl : this.homeUrl;
        this.loginRedirectUrl = null;

        const urlParamsAndFragment = AuthService.splitInTwo(redirect, '#');
        const urlAndParams = AuthService.splitInTwo(urlParamsAndFragment.firstPart, '?');

        const navigationExtras: NavigationExtras = {
            fragment: urlParamsAndFragment.secondPart,
            queryParams: AuthService.getQueryParamsFromString(urlAndParams.secondPart),
            queryParamsHandling: 'merge'
        };

        this.router.navigate([urlAndParams.firstPart], navigationExtras);
    }

    redirectLogoutUser() {
        const redirect = this.logoutRedirectUrl ? this.logoutRedirectUrl : this.loginUrl;
        this.logoutRedirectUrl = null;

        this.router.navigate([redirect]);
    }

    redirectForLogin() {
        this.loginRedirectUrl = this.router.url;
        this.router.navigate([this.loginUrl]);
    }

    reLogin() {
        if (this.reLoginDelegate) {
            this.reLoginDelegate();
        } else {
            this.redirectForLogin();
        }
    }

    refreshLogin() {
    }

    loginWithPassword(userName: string, password: string, rememberMe?: boolean) {

    }

    private processLoginResponse(response: any, rememberMe?: boolean) {
        const accessToken = response.access_token;

        if (accessToken == null) {
            throw new Error('accessToken cannot be null');
        }
    }

    logout(): void {

    }

    getLoginStatusEvent(): Observable<boolean> {
        return this.loginStatus.asObservable();
    }



    get accessToken(): string {
        return "";
    }

}
