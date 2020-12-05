import { Injectable, Inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';

import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { STORE_SERVICE } from '../services/auth.service';
import { IStore } from '../services/contracts/istore';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(@Inject(STORE_SERVICE) private store: IStore) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const authToken = this.store.get('token');
        return of(authToken).pipe(
            switchMap((token) => {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return next.handle(request);
            })
        );
    }
}
