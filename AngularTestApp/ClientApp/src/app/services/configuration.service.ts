import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LocalStoreManager } from './local-store-manager.service';
import { DBkeys } from './db-keys';
import { Utilities } from './utilities';
import { environment } from '../../environments/environment';

interface UserConfiguration {
    homeUrl: string;
    showDashboardStatistics: boolean;
    showDashboardNotifications: boolean;
    showDashboardTodo: boolean;
    showDashboardBanner: boolean;
}

@Injectable()
export class ConfigurationService {

    constructor(
        private localStorage: LocalStoreManager,
    ) {

        this.loadLocalChanges();
    }

    set homeUrl(value: string) {
        this._homeUrl = value;
        this.saveToLocalStore(value, DBkeys.HOME_URL);
    }
    get homeUrl() {
        return this._homeUrl || ConfigurationService.defaultHomeUrl;
    }

    set showDashboardStatistics(value: boolean) {
        this._showDashboardStatistics = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_STATISTICS);
    }
    get showDashboardStatistics() {
        return this._showDashboardStatistics != null ? this._showDashboardStatistics : ConfigurationService.defaultShowDashboardStatistics;
    }

    set showDashboardNotifications(value: boolean) {
        this._showDashboardNotifications = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
    }
    get showDashboardNotifications() {
        return this._showDashboardNotifications != null ? this._showDashboardNotifications : ConfigurationService.defaultShowDashboardNotifications;
    }

    set showDashboardTodo(value: boolean) {
        this._showDashboardTodo = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_TODO);
    }
    get showDashboardTodo() {
        return this._showDashboardTodo != null ? this._showDashboardTodo : ConfigurationService.defaultShowDashboardTodo;
    }

    set showDashboardBanner(value: boolean) {
        this._showDashboardBanner = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_BANNER);
    }
    get showDashboardBanner() {
        return this._showDashboardBanner != null ? this._showDashboardBanner : ConfigurationService.defaultShowDashboardBanner;
    }
    public static readonly appVersion: string = '5.0.0';

    // ***Specify default configurations here***
    public static readonly defaultHomeUrl: string = '/';
    public static readonly defaultShowDashboardStatistics: boolean = true;
    public static readonly defaultShowDashboardNotifications: boolean = true;
    public static readonly defaultShowDashboardTodo: boolean = false;
    public static readonly defaultShowDashboardBanner: boolean = true;

    public baseUrl = environment.baseUrl || Utilities.baseUrl();
    public tokenUrl = environment.tokenUrl || environment.baseUrl || Utilities.baseUrl();
    public loginUrl = environment.loginUrl;
    public fallbackBaseUrl = 'https://quickapp.ebenmonney.com';
    // ***End of defaults***

    private _homeUrl: string = null;
    private _showDashboardStatistics: boolean = null;
    private _showDashboardNotifications: boolean = null;
    private _showDashboardTodo: boolean = null;
    private _showDashboardBanner: boolean = null;
    private onConfigurationImported: Subject<boolean> = new Subject<boolean>();

    configurationImported$ = this.onConfigurationImported.asObservable();

    private loadLocalChanges() {

        if (this.localStorage.exists(DBkeys.HOME_URL)) {
            this._homeUrl = this.localStorage.getDataObject<string>(DBkeys.HOME_URL);
        }

        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_STATISTICS)) {
            this._showDashboardStatistics = this.localStorage.getDataObject<boolean>(DBkeys.SHOW_DASHBOARD_STATISTICS);
        }

        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS)) {
            this._showDashboardNotifications = this.localStorage.getDataObject<boolean>(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        }

        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_TODO)) {
            this._showDashboardTodo = this.localStorage.getDataObject<boolean>(DBkeys.SHOW_DASHBOARD_TODO);
        }

        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_BANNER)) {
            this._showDashboardBanner = this.localStorage.getDataObject<boolean>(DBkeys.SHOW_DASHBOARD_BANNER);
        }
    }

    private saveToLocalStore(data: any, key: string) {
        setTimeout(() => this.localStorage.savePermanentData(data, key));
    }

    public import(jsonValue: string) {
        this.clearLocalChanges();

        if (jsonValue) {
            const importValue: UserConfiguration = Utilities.JsonTryParse(jsonValue);

            if (importValue.homeUrl != null) {
                this.homeUrl = importValue.homeUrl;
            }

            if (importValue.showDashboardStatistics != null) {
                this.showDashboardStatistics = importValue.showDashboardStatistics;
            }

            if (importValue.showDashboardNotifications != null) {
                this.showDashboardNotifications = importValue.showDashboardNotifications;
            }

            if (importValue.showDashboardTodo != null) {
                this.showDashboardTodo = importValue.showDashboardTodo;
            }

            if (importValue.showDashboardBanner != null) {
                this.showDashboardBanner = importValue.showDashboardBanner;
            }
        }

        this.onConfigurationImported.next();
    }

    public export(changesOnly = true): string {
        const exportValue: UserConfiguration = {
            homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
            showDashboardStatistics: changesOnly ? this._showDashboardStatistics : this.showDashboardStatistics,
            showDashboardNotifications: changesOnly ? this._showDashboardNotifications : this.showDashboardNotifications,
            showDashboardTodo: changesOnly ? this._showDashboardTodo : this.showDashboardTodo,
            showDashboardBanner: changesOnly ? this._showDashboardBanner : this.showDashboardBanner
        };

        return JSON.stringify(exportValue);
    }

    public clearLocalChanges() {
        this._homeUrl = null;
        this._showDashboardStatistics = null;
        this._showDashboardNotifications = null;
        this._showDashboardTodo = null;
        this._showDashboardBanner = null;

        this.localStorage.deleteData(DBkeys.LANGUAGE);
        this.localStorage.deleteData(DBkeys.THEME_ID);
        this.localStorage.deleteData(DBkeys.HOME_URL);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_STATISTICS);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_TODO);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_BANNER);
    }   
}
