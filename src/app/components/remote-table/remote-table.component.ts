import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { debounceTime, takeUntil, filter } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

import { RemoteDatasource } from './remote-datasource';

import * as moment from 'moment';
import * as _ from 'lodash';
import { BaseActivity } from 'src/app/activities/base.activity';
import { LoadStates, TableAction, TableColumn, TableState } from 'src/app/services/contracts/component.state';
import { PageInfo } from 'src/app/services/contracts/page.info';

export function paginatorProvider() {
    const paginator = new MatPaginatorIntl();
    paginator.itemsPerPageLabel = 'Records Per Pagina';
    return paginator;
}

@Component({
    selector: 'ktk-remote-table',
    templateUrl: './remote-table.component.html',
    styleUrls: ['./remote-table.component.scss'],
   
})
export class RemoteTableComponent extends BaseActivity implements OnInit {
    @Input() loadState = LoadStates.LOADING;
    _columns: TableColumn[] = [];

    @Input() tableState$: Observable<TableState<any>>;

    @Input() title = 'Title';
    @Input() showCreate = false;

    @Input() tableActions: TableAction[] = [];

    @Output() queryEvent = new EventEmitter();
    @Output() newClicked = new EventEmitter();

    @Output() rowClicked = new EventEmitter();
    @Output() actionClicked = new EventEmitter();

    @Input() searchSubject: Observable<string>;

    @Input() tblClass = '';

    @Input() colorClass = 'primary';

    @Input() set columns(cols: TableColumn[]) {
        this._columns = cols;
        if (this._columns) {
            this.displayedColumns = [
                ...this.columns
                    .filter((col) => col.visible)
                    .map((col) => col.field),
            ];
            if (this.tableActions && this.tableActions.length > 0) {
                this.displayedColumns.push('actions');
            }
        }
    }

    get columns() {
        return this._columns;
    }

    tableState: TableState<any> = {
        page: 1,
        pageSize: 10,
        sorts: {},
    } as TableState<any>;

    displayedColumns = [];
    dataSource: RemoteDatasource;
    query: PageInfo;

    dataSubject: BehaviorSubject<any>;
    searchColumn = null;
    searchValue = '';
    selected: any;

    loadStates = LoadStates;

    pageIndex = 0;
    pageSize = 10;
    total_rows = 0;
    isReady = false;
    constructor() {
        super();

        this.dataSubject = new BehaviorSubject<any>([]);
        this.dataSource = new RemoteDatasource(this.dataSubject);
    }

    ngOnInit(): void {
        this.tableState$
            .pipe(
                filter((state) => state !== undefined),
                takeUntil(this.destroyed$)
            )
            .subscribe((state) => {
                this.pageSize = state.pageSize;
                this.total_rows = state.total_rows;
                this.pageIndex = state.page;
                this.loadState = state.state;
                this.dataSubject.next(state.items);
            });

        this.query = this.initialQuery();
        if (!this.searchSubject) {
            this.queryEvent.emit(this.query);
        }

        if (this.searchSubject) {
            this.searchSubject
                .pipe(takeUntil(this.destroyed$), debounceTime(1000))
                .subscribe((val) => this.applyFilter(val));
        }
    }

    applyFilter(val): void {
        this.query = this.initialQuery();
        if (val.length > 0) {
            this.query.searchTerm = val;
        }

        this.queryEvent.emit(this.query);
    }

    clearFilter() {
        this.searchColumn = null;
        this.searchValue = '';
        const query = this.initialQuery();
        this.queryEvent.emit(query);
    }

    displayCallBack(item, col): string {
        const field = col.field;

        switch (col.type) {
            case 'date':
                return `<span>${moment(item[field]).format(
                    col.dateFormat
                )}</span>`;
            case 'custom':
                return `<span>${col.render(item)}</span>`;
            default:
                return `<span>${_.get(item, field, '')}</span>`;
        }
    }

    initialQuery(): PageInfo {
        return <PageInfo>{
            page: 0,
            pageSize: 10,
            searchTerm: '',
            sorts: { _id: -1 },
        };
    }

    onActionClick(e, item, action): void {
        this.actionClicked.emit({ data: item, action: action });
        e.stopPropagation();
    }

    sortData(sort: Sort): void {
        this.query.sorts = {
            [sort.active]: this.getSortValue(sort.direction),
        };
        this.query.page = 0;

        this.queryEvent.emit(this.query);
    }

    getSortValue(direction) {
        switch (direction) {
            case 'desc':
                return -1;
            case 'asc':
                return 1;
        }
    }

    onPageChanged(pageEvent: PageEvent): void {
        this.query.pageSize = pageEvent.pageSize;
        this.query.page = pageEvent.pageIndex;
        this.queryEvent.emit(this.query);
    }

    onSelect(row): void {
        this.selected = row;
        this.rowClicked.emit(row);
    }

    onNewClick(): void {
        this.newClicked.emit();
    }
}
