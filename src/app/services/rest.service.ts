import { delay, map } from 'rxjs/operators';
import { IRestService } from './contracts/irestservice';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Inject, InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable({
    providedIn: 'root',
})
export class RestService implements IRestService {
    private baseUrl = '';
    private delay = 500;
    private headers: any = {
        'Content-type': 'application/json',
    };

    constructor(
        @Inject(API_URL) public apiUrl: string,
        private http: HttpClient
    ) {
        this.baseUrl = apiUrl;
    }

    addHeader(key: string, value: string) {
        this.headers[key] = value;
    }

    removeHeader(key: string) {
        delete this.headers[key];
    }

    get(api: string, query?: any) {
        const queryUrl = `${this.baseUrl}/${api}${this.toRequestUrl(query)}`;
        return this.http
            .get(queryUrl, { headers: this.headers })
            .pipe(delay(this.delay))
            .toPromise();
    }

    post(api: string, data = {}) {
        const postUrl = `${this.baseUrl}/${api}`;
        return this.http
            .post(postUrl, data, { headers: this.headers })
            .pipe(delay(this.delay))

            .toPromise();
    }

    put(api: string, data = {}) {
        const postUrl = `${this.baseUrl}/${api}`;
        return this.http
            .put(postUrl, data, { headers: this.headers })
            .pipe(delay(this.delay))
            .toPromise();
    }

    patch(api: string, data = {}) {
        const postUrl = `${this.baseUrl}/${api}`;
        return this.http
            .patch(postUrl, data, { headers: this.headers })
            .pipe(delay(this.delay))
            .toPromise();
    }

    delete(api: string) {
        const url = `${this.baseUrl}/${api}`;
        return this.http.delete(url).pipe(delay(this.delay)).toPromise();
    }

    handleData(response: HttpResponse<any>) {
        if (response.status > 400) {
            throw new Error((<any>response.body).message);
        }
        return response.body;
    }

    private toRequestUrl = (dbQuery: any) => {
        if (!dbQuery) {
            return '';
        }

        const terms = Object.keys(dbQuery).map((k) => {
            return `${k}=${this.sanitizeValue((<any>dbQuery)[k], k)}`;
        });
        return terms.length > 0 ? '?' + terms.join('&') : '';
    };

    sanitizeValue(val: any, key: string) {
        if (key === '$or') {
            const values = val as any[];
            return encodeURIComponent(
                `[${values.map((v) => JSON.stringify(v)).join(',')}]`
            );
        }
        if (Array.isArray(val)) {
            return encodeURIComponent(val.join(','));
        }
        if (typeof val === 'object') {
            return encodeURIComponent(JSON.stringify(val));
        }

        return val;
    }
}
