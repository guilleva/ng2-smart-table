import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Grid } from '../../lib/grid';

@Component({
    selector: '[ng2-st-tbody]',
    templateUrl: './tbody.component.html'
})
export class Ng2SmartTableTbodyComponent {

    @Input() grid: Grid;
    @Input() source: any;
    @Input() deleteConfirm: EventEmitter<any>;
    @Input() editConfirm: EventEmitter<any>;

    @Output() save = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    @Output() edited = new EventEmitter<any>();
    @Output() userSelectRow = new EventEmitter<any>();
    @Output() editRowSelect = new EventEmitter<any>();
    @Output() multipleSelectRow = new EventEmitter<any>();

    onDoubleClickRow(event: any, row) {
      event.preventDefault();
      event.stopPropagation();

      this.editRowSelect.emit(row);

      if (this.grid.getSetting('mode') === 'external') {
        this.edit.emit({
          data: row.getData(),
          source: this.source
        });
      } else {
        this.grid.edit(row);
      }
    }
}
