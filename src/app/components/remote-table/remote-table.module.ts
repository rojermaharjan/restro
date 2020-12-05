import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    RemoteTableComponent,
    paginatorProvider,
} from './remote-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {
    MatPaginatorIntl,
    MatPaginatorModule,
} from '@angular/material/paginator';
import { CdkTableModule } from '@angular/cdk/table';
import { TranslateModule } from '@ngx-translate/core';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FuseSharedModule } from '../../../../ui/src';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        CdkTableModule,
        FuseSharedModule,
        TranslateModule,
        NgxShimmerLoadingModule,
        MatButtonModule,
        FlexLayoutModule,
        MatPaginatorModule,
        MatTooltipModule,
    ],
    declarations: [RemoteTableComponent],
    exports: [RemoteTableComponent],
    providers: [{ provide: MatPaginatorIntl, useValue: paginatorProvider() }],
})
export class RemoteTableModule {}
