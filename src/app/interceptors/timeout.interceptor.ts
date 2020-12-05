import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { timeout, catchError, timeoutWith } from 'rxjs/operators';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
    constructor(
        @Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number = 1000
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                timeoutWith(
                    this.defaultTimeout,
                    throwError(of(new Error('REQUEST_TIMED_OUT')))
                )
            );
    }
}
