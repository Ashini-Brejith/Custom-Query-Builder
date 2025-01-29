import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-alias',
  imports: [FormsModule, CommonModule],
  templateUrl: './table-alias.component.html',
  styleUrl: './table-alias.component.css',
})
export class TableAliasComponent {
  @Input() alias: string = '';
  @Output() aliasChange = new EventEmitter<string>();

  onAliasChange(value: string) {
    this.aliasChange.emit(value);
  }
}
