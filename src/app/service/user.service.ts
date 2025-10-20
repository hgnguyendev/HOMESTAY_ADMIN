
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ReplaySubject } from "rxjs";
import { AppConfig } from '../_config/app-config';
import { BaseSevice } from './base.service';


import 'firebase/compat/auth';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private _baseService: BaseSevice,
        private _angularFireAuth: AngularFireAuth) {
        this._angularFireAuth.authState.subscribe((user: any) => {
            if (user) {
                this.getUserInfo();
            } else {
                this._currentUserSubject.next(null);
            }
        });
    }
    isAuthenticating: boolean = false


    private _currentUserSubject = new ReplaySubject<any>(1);
    currentUser$ = this._currentUserSubject.asObservable();
    currentUser: any;

    async loginWithEmail(email: string, password: string) {
        try {
            const result = await this._angularFireAuth.signInWithEmailAndPassword(email, password);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUserInfo() {
        try {
            const userInfo = await this._baseService.get(`${AppConfig.settings.apiEndpoint}/bo-users/get-user`);
            this._currentUserSubject.next(userInfo)
        } catch (err) {
            console.log(err)
            this._currentUserSubject.next(null);
        }
    }

    async logout() {
        try {
            const result = await this._angularFireAuth.signOut();
            this.currentUser = null;
            this._currentUserSubject.next(null);
            return result;
        } catch (error) {
            throw error;
        }
    }


}
