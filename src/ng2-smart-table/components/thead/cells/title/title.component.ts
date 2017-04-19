import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  SimpleChanges,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnChanges
} from '@angular/core';

import { DataSource } from '../../../../lib/data-source/data-source';
import { Column } from '../../../../lib/data-set/column';

@Component({
  selector: 'ng2-smart-table-title',
  styleUrls: ['./title.component.scss'],
  template: `
    <ng-template #dynamicTarget></ng-template>
    <div *ngIf="!customComponent">
      <a href="#" *ngIf="column.isSortable"
                  (click)="_sort($event, column)"
                  class="ng2-smart-sort-link sort"
                  [ngClass]="currentDirection">
        <div *ngIf="column.title">{{ column.title }}</div>
      </a>
      <span class="ng2-smart-sort" *ngIf="!column.isSortable">{{ column.title }}</span>
    </div>
  `,
})
export class TitleComponent implements OnInit, OnChanges {
  currentDirection = '';
  @Input() column: Column;
  @Input() source: DataSource;
  @ViewChild('dynamicTarget', { read: ViewContainerRef }) dynamicTarget: any;
  @Output() sort = new EventEmitter<any>();

  constructor(private resolver: ComponentFactoryResolver) { }

  customComponent: any;

  ngOnInit() {
    this.source.onChanged().subscribe((elements) => {
      const sortConf = this.source.getSort();

      if (sortConf.length > 0 && sortConf[0]['field'] === this.column.id) {
        this.currentDirection = sortConf[0]['direction'];
      } else {
        this.currentDirection = '';
      }

      sortConf.forEach((fieldConf: any) => {

      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.column && this.column.header && !this.customComponent) {
      const componentFactory = this.resolver.resolveComponentFactory(this.column.header.component);
      this.customComponent = this.dynamicTarget.createComponent(componentFactory);

      // set @Inputs and @Outputs of custom component
      this.customComponent.instance.column = this.column;
      this.customComponent.instance.title = this;
    }
  }

  _sort(event: any) {
    event.preventDefault();
    this.changeSortDirection();
    this.source.setSort([
      {
        field: this.column.id,
        direction: this.currentDirection,
        compare: this.column.getCompareFunction(),
      },
    ]);
    this.sort.emit(null);
  }

  changeSortDirection(): string {
    if (this.currentDirection) {
      const newDirection = this.currentDirection === 'asc' ? 'desc' : 'asc';
      this.currentDirection = newDirection;
    } else {
      this.currentDirection = this.column.sortDirection;
    }
    return this.currentDirection;
  }
}
