import { Observable } from 'rxjs';

export interface IStore {
    value: any;

    get(key: string): any;

    watch<T>(name: string): Observable<T>;

    set<T>(name: string, state: any, save?: boolean): Promise<void>;

    updateById<T>(name: string, state: any, save: boolean);
    update<T>(key: string, update: any): Promise<void>;

    clear(): void;

    init(state: any): Promise<void>;
}
