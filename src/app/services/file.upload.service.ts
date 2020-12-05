import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { API_URL } from './rest.service';

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    constructor(
        private http: HttpClient,
        @Inject(API_URL) private BASE_API_URL: string
    ) {}

    uploadFile(
        uploadUrl: string,
        file: any,
        field = 'imageUpload',
        params = null,
        token?: string
    ): Promise<any> {
        try {
            const formData = new FormData();
            formData.append(field, file, file.name);
            if (params) {
                Object.keys(params).forEach((k) => {
                    formData.append(k, params[k]);
                });
            }
            const headers = new HttpHeaders({
                enctype: 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            });
            return this.http
                .post(`${this.BASE_API_URL}/${uploadUrl}`, formData, {
                    headers: headers,
                })
                .toPromise();
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    listFiles(dir: string) {
        return this.http.post(this.BASE_API_URL + '/list', { path: dir });
    }
}
