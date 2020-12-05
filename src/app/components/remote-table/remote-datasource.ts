import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
export class RemoteDatasource extends DataSource<any> {
    dataSubject: BehaviorSubject<any[]>;
    constructor(private ds: BehaviorSubject<any[]>) {
        super();
        this.dataSubject = ds;
    }

    connect(): Observable<any[]> {
        return this.dataSubject;
    }

    disconnect(): void {
        console.log('Table Disconnects');
    }
}
