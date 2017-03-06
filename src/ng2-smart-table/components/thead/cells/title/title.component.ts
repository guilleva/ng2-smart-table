import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { DataSource } from '../../../../lib/data-source/data-source';
import { Column } from '../../../../lib/data-set/column';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';

@Component({
  selector: 'ng2-smart-table-title',
  styleUrls: ['./title.component.scss'],
  template: `
    <div *ngIf="column.options">
          <ng2-completer
            (selected)="columnSelected($event)"
            [datasource]="dataService"
            placeholder="Set column name"
            [minSearchLength]="0"></ng2-completer>
    </div>

    <a href="#" *ngIf="column.isSortable"
                (click)="_sort($event, column)"
                class="ng2-smart-sort-link sort"
                [ngClass]="currentDirection">
      <div *ngIf="column.title">{{ column.title }}</div>
    </a>
    <span class="ng2-smart-sort" *ngIf="!column.isSortable">{{ column.title }}</span>
  `
})
export class TitleComponent implements OnInit {
  currentDirection = '';
  @Input() column: Column;
  @Input() source: DataSource;
  @Output() sort = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();
  protected dataService: CompleterData;

  constructor(private completerService: CompleterService) { }

  ngOnInit() {
    if (this.column.options) {
      this.dataService = this.completerService.local(this.column.options, 'title', 'title');
    }
    this.source.onChanged().subscribe((elements) => {
      let sortConf = this.source.getSort();

      if (sortConf.length > 0 && sortConf[0]['field'] === this.column.id)
        this.currentDirection = sortConf[0]['direction'];
      else
        this.currentDirection = '';

      sortConf.forEach((fieldConf) => {

      });
    });
  }

  columnSelected(selectedItem: CompleterItem) {
    if (selectedItem && selectedItem.originalObject) {
      const oldKey = this.column.id;
      const newKey = selectedItem.originalObject.value;
      if (oldKey !== newKey) {
        this.column.id = newKey;
        this.source.renameColumn(oldKey, newKey);
        this.change.emit(selectedItem);
      }
    }
  }

  _sort(event: any) {
    event.preventDefault();
    this.changeSortDirection();
    this.source.setSort([
      {
        field: this.column.id,
        direction: this.currentDirection,
        compare: this.column.getCompareFunction()
      }
    ]);
    this.sort.emit(null);
  }

  changeSortDirection(): string {
    if (this.currentDirection) {
      let newDirection = this.currentDirection === 'asc' ? 'desc' : 'asc';
      this.currentDirection = newDirection;
    } else {
      this.currentDirection = this.column.sortDirection;
    }
    return this.currentDirection;
  }
}