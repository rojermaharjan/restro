import { Observable } from 'rxjs';
import { DbQuery } from './dbquery';

export interface IRestService {
    get(api: string, query?: DbQuery): Promise<any>;
    put(api: string, body?: any): Promise<any>;
    post(api: string, body?: any): Promise<any>;
    patch(api: string, body?: any): Promise<any>;
    delete(api: string): Promise<any>;
}
