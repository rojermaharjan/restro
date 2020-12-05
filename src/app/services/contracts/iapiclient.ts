export interface IStateService<T> {
    loadMore(stateKey: string, filter?: any): Promise<T[]>;
    refresh(stateKey: string, filter?: any): Promise<T[]>;
    getItems(stateKey: string, filter?: any): Promise<T[]>;
    getItem(id: any, filter?: any): Promise<T>;
    upsert(data: any, stateKey: string): Promise<any>;
    setStateLoading(stateKey: string);
}
