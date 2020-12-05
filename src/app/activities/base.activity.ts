import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// TODO: Add Angular decorator.
@Component({
    template: `<span>base</span>`,
})
export class BaseActivity implements OnDestroy {
    protected destroyed$ = new Subject<boolean>();

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
        this.destroyed$.unsubscribe();
    }
}
