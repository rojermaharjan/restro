import { PageInfo } from './page.info';

export interface DbQuery extends PageInfo {
    filters: any;
}

export enum Aggregate {
    SUM = 'sum',
    COUNT = 'count',
    AVERAGE = 'avg',
}

export interface Aggregation {
    op_type: string;
    fields: string[];
    grp: string[];
}



export class ResultList<T> {
    success: boolean;
    message: string;
    total_match: number;
    results: T[];

    constructor(results: T[], total_match: number, message = 'List Success', success = true) {
        this.results = results;
        this.total_match = total_match;
        this.success = success;
        this.message = message;
    }
}

export class Result<T> {
    success: boolean;
    message: string;
    total_match: number;
    result: T;

    constructor(result: T, message = 'List Success', success = true) {
        this.result = result;

        this.success = success;
        this.message = message;
    }
}

