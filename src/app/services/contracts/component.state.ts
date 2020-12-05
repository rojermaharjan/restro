export interface TableColumn {
    label: string;
    field: string;
    dateFormat?: string;
    type?: string;
    render?: (item) => string;
    visible: boolean;
    searchable: boolean;
}

export interface TableAction {
    icon: string;
    id?: string;
    label: string;
}
export enum LoadStates {
    LOADING = 'LOADING',
    COMPLETE = 'COMPLETE',
    ERROR = 'ERROR',
    NORESULT = 'NORESULT',
    RESULTSEND = 'RESULTSEND',
    INIT = 'INIT',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IComponentState<T> {
    state: LoadStates;
}

export interface FilterState extends IComponentState<any> {
    filter: any;
}

export interface ListState<T> extends IComponentState<T> {
    items: Array<T>;
    loadMoreState: string;
    refreshState: string;
    searchTerm: string;
    page: number;
    total_rows: number;
    pageSize: number;
}

export interface DetailState<T> extends IComponentState<T> {
    item: T;
}

export interface TableState<T> extends ListState<T> {
    sorts: any;
    columns: TableColumn[];
}

export interface MasterDetailState<T> extends IComponentState<T> {
    primaryOptions: T[];
    secondaryOptions: T[];
    segment: string;

    primaryFilter: T;
    secondaryFilter: T;
    extraFilters: { [key: string]: T[] };
    searchTerm: string;
    selectedItem: any;
    items: T[];
    page: number;
    pageSize: number;
    sorts: any;
    loadMoreState: LoadStates;
}

export const initListState = <T>() => {
    return {
        items: [],
        loadMoreState: LoadStates.INIT,
        refreshState: LoadStates.INIT,
        searchTerm: '',
        total_rows: 0,
        page: 0,
        pageSize: 10,
    } as ListState<T>;
};

export const initFilterState = () => {
    return {
        state: LoadStates.INIT,
        filter: <any>{},
    };
};

export const initDetailState = <T>() => {
    return {
        state: LoadStates.INIT,
        item: null,
    } as DetailState<T>;
};

export const initTableState = <T>(): TableState<T> => {
    return {
        ...initListState<T>(),
        items: new Array(5),
        page: 0,
        pageSize: 10,

        sorts: [],
    } as TableState<T>;
};

export const initMasteDetailState = <T>(): MasterDetailState<T> => {
    return {
        primaryOptions: [],
        secondaryOptions: [],
        segment: '/',
        primaryFilter: null,
        secondaryFilter: null,
        extraFilters: {},
        searchTerm: '',
        selectedItem: null,
        state: LoadStates.INIT,
        items: [],
        page: 0,
        pageSize: 10,
        sorts: { _id: -1 },
        loadMoreState: LoadStates.INIT,
    };
};
