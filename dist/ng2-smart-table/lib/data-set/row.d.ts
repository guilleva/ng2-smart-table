import { Cell } from './cell';
import { Column } from './column';
import { DataSet } from './data-set';
export declare class Row {
    index: number;
    protected data: any;
    protected _dataSet: DataSet;
    isSelected: boolean;
    isInEditing: boolean;
    cells: Array<Cell>;
    class: string;
    constructor(index: number, data: any, _dataSet: DataSet);
    getCell(column: Column): Cell;
    getCells(): Cell[];
    getClass(): string;
    getData(): any;
    getNewData(): any;
    setData(data: any): any;
    process(): void;
    createCell(column: Column): Cell;
}
