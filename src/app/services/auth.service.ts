import { Injectable, InjectionToken, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IStore } from './contracts/istore';


export const AUTH_ENDPOINT = new InjectionToken<string>('AUTH_ENDPOINT');
export const STORE_SERVICE = new InjectionToken<IStore>('STORE_SERVICE');
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private headers: any = {
        'Content-type': 'application/json',
    };

    constructor(
        private http: HttpClient,
        @Inject(AUTH_ENDPOINT) public authEnd: string,
        @Inject(STORE_SERVICE) private store: IStore
    ) {}

    async emailLogin(email: string, password: string) {
        try {
            const { user, token, refresh_token } = (await this.http
                .post(
                    `${this.authEnd}/login`,
                    { email, password },
                    { headers: this.headers }
                )
                .toPromise()) as any;
            await this.store.set('user', user, true);
            await this.store.set('token', token, true);
            await this.store.set('refresh_token', refresh_token, true);
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async userNameLogin(username: string, password: string) {
        try {
            const { user, token, refresh_token } = (await this.http
                .post(
                    `${this.authEnd}/login`,
                    { username, password },
                    { headers: this.headers }
                )
                .toPromise()) as any;
            user.token = token;
            user.refresh_token = refresh_token;
            await this.store.set('user', user, true);
            await this.store.set('token', token, true);
            await this.store.set('refresh_token', refresh_token, true);

            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async registerUser(body: any) {
        try {
            const token = this.store.get('token');
            const headers = {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            const user = await this.http
                .post(`${this.authEnd}/boregister`, body, {
                    headers: headers,
                })
                .toPromise();
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async forgotPassword(email: string) {
        try {
            const res = await this.http
                .get(`${this.authEnd}/forgot_password/${email}`)
                .toPromise();
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async changePassword(oldpassword: string, newpassword: string) {
        try {
            const res = await this.http
                .post(`${this.authEnd}/change_password`, {
                    oldpassword,
                    newpassword,
                })
                .toPromise();
            return res;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async resetPassword(reset_token: string, newpassword: string) {
        try {
            const user = await this.http
                .post(
                    `${this.authEnd}/reset_password`,
                    { reset_token, newpassword },
                    { headers: this.headers }
                )
                .toPromise();
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async logout() {
        try {
            const profiles = this.store.get('profiles');
            const user = this.store.get('user');
            profiles[user.user_id] = user;
            await this.store.set('profiles', profiles, true);

            await this.store.set('user', null, true);
            await this.store.set('token', null, true);
            await this.store.set('refresh_token', null, true);
            await this.store.clear();
        } catch (err) {
            console.error(err);
        }
    }

    getCurrentUser() {
        return this.store.watch<any>('user');
    }

    async switchAccount(user_id: string) {
        const profileMap = this.store.get('profiles');
        const currentUser = this.store.get('user');
        profileMap[currentUser.user_id] = currentUser;
        await this.store.set('profiles', profileMap, true);
        const user = profileMap[user_id];
        if (user) {
            await this.store.clear();
            await this.store.set('user', user, true);
            await this.store.set('token', user.token, true);
            await this.store.set('refresh_token', user.refresh_token, true);
        }
    }
}
