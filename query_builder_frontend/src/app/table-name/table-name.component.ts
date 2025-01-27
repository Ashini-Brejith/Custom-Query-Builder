import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-name',
  imports: [CommonModule, FormsModule],
  templateUrl: './table-name.component.html',
  styleUrl: './table-name.component.css',
})
export class TableNameComponent {
  @Input() table: string = '';
  @Output() tableChange = new EventEmitter<string>();

  onTableChange(value: string) {
    this.tableChange.emit(value);
  }
}
