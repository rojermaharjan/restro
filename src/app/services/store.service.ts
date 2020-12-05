import { Injectable, isDevMode, InjectionToken, Inject } from '@angular/core';


import { BehaviorSubject, Observable } from 'rxjs';

import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { INITIAL_STATE, State } from '../store/app.state';

export const STORE_STATE = new InjectionToken<any>('STORE_STATE');

const toJSON = ['user'];
@Injectable({
    providedIn: 'root',
})
export class StoreService {
    public static readonly PREFIX = '$ktk$';
    static count = 0;
    private subject = new BehaviorSubject<State>(this.state);
    defaultState = INITIAL_STATE;

    constructor(@Inject(STORE_STATE) private state: any) {
        StoreService.count++;
        console.log(StoreService.count);
        this.init(state);
    }

    // -- Public methods
    get value() {
        return this.subject.value;
    }

    getKeys() {
        return Object.keys(this.subject.value);
    }

    get<T>(key: string): any {
        return this.value[key] as T;
    }

    watch<T>(name: string): Observable<T> {
        return this.subject
            .pipe(pluck<State, T>(name))
            .pipe(distinctUntilChanged<T>());
    }

    watchBy<T>(name: string, comparator: (a, b) => boolean) {
        return this.subject
            .pipe(pluck<State, T>(name))
            .pipe(distinctUntilChanged<T>(comparator));
    }

    async set<T>(name: string, state: any, save = true): Promise<void> {
        try {
            this.subject.next({
                ...this.value,
                [name]: state,
            });

            if (save) {
                await this.save(name);
            }
            if (isDevMode()) {
                // console.log(this.value);
            }
        } catch (e) {
            console.error(StoreService.name, 57, e);
        }
    }

    async updateById<T>(name: string, state: any, save = true) {
        try {
            if (!Array.isArray(this.subject.value[name])) {
                return 'Not an array';
            }
            const array = [...this.subject.value[name]];
            const index = array.findIndex((value) => value.id === state.id);
            if (index > -1) {
                array[index] = {
                    ...array[index],
                    ...state,
                };

                if (save) {
                    await this.set(name, array);
                }
            }
        } catch (e) {
            console.error(StoreService.name, 57, e);
        }
    }

    async update<T>(key: string, update: any) {
        try {
            const oldstate = this.get(key);

            await this.set(
                key,
                {
                    ...oldstate,
                    ...update,
                },
                true
            );
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async addItem(key: string, item: any) {
        const oldstate = this.get(key);

        await this.set(
            key,
            { ...oldstate, items: [...oldstate.items, item] },
            true
        );
    }

    async clear() {
        this.subject.next(this.defaultState);
        try {
            // tslint:disable-next-line:forin
            const keys = Object.keys(this.defaultState);
            for (const key of keys) {
                //  console.log(key);
                if (key !== 'profiles') {
                    localStorage.removeItem(`${StoreService.PREFIX}${key}`);
                }
            }
        } catch (ignored) {
            console.error(StoreService.name, 71, ignored);
        }
    }

    // -- Private methods
    async init(state: any): Promise<void> {
        try {
            // tslint:disable-next-line:forin
            for (const key in state) {
                const item = localStorage.getItem(
                    `${StoreService.PREFIX}${key}`
                );
                if (item) {
                    const itemValue = JSON.parse(item);
                    await this.set(key, itemValue, false);
                } else {
                    await this.set(key, state[key], false);
                }
            }

            this.defaultState = state;
        } catch (e) {
            console.error(StoreService.name, 89, e);
        }
    }

    private async save(itemName: string): Promise<void> {
        try {
            localStorage.setItem(
                `${StoreService.PREFIX}${itemName}`,
                JSON.stringify(this.value[itemName], null, 2)
            );
        } catch (e) {
            console.error(StoreService.name, 102, e);
        }
    }
}
