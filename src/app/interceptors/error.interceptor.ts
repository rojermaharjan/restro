import { Injectable, Inject } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { STORE_SERVICE } from '../services/auth.service';
import { IStore } from '../services/contracts/istore';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        @Inject(STORE_SERVICE) private store: IStore,
        private translate: TranslateService,
        private _snackBar: MatSnackBar
    ) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(async (err: HttpErrorResponse) => {
                if (err.status === 401) {
                    console.error('User Logged Out');
                    await this.store.set('user', null, true);
                    await this.store.set('token', null, true);
                }

                const msg = await this.translate
                    .get(this.getMessage(err))
                    .toPromise();

                this._snackBar.open(msg, 'OK', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                });

                throw err;
            })
        );
    }

    getMessage(err: HttpErrorResponse) {
        const errorMsg =
            err && err.error
                ? err.error.message
                : err.message
                ? err.message
                : 'FAILED_TO_CONNECT_TO_SERVER';
        return errorMsg && errorMsg.length > 0
            ? errorMsg
            : 'FAILED_TO_CONNECT_TO_SERVER';
    }
}
