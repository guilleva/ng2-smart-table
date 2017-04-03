import { EventEmitter, OnInit } from '@angular/core';
import { DataSource } from '../../../../lib/data-source/data-source';
import { Column } from '../../../../lib/data-set/column';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
export declare class TitleComponent implements OnInit {
    private completerService;
    currentDirection: string;
    column: Column;
    source: DataSource;
    sort: EventEmitter<any>;
    autompleteSelect: EventEmitter<any>;
    protected dataService: CompleterData;
    protected selectedOption: string;
    constructor(completerService: CompleterService);
    ngOnInit(): void;
    columnSelected(selectedItem: CompleterItem): void;
    _sort(event: any): void;
    changeSortDirection(): string;
}
