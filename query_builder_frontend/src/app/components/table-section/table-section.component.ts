import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './table-section.component.html',
  styleUrl: './table-section.component.css'
})
export class TableSectionComponent {
  @Input() table: string = '';
  @Output() tableChange = new EventEmitter<string>();

  @Input() showAlias: boolean = true;
  @Input() alias: string = '';
  @Output() aliasChange = new EventEmitter<string>();

  tableError: string = '';
  aliasError: string = '';

  onTableChange(value: string) {
    const validTableName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!validTableName.test(value)) {
      this.tableError = 'Invalid table name! Use only letters, numbers, and underscores, and start with a letter.';
    } else {
      this.tableError = ''; 
      this.tableChange.emit(value);
    }
  }

  onAliasChange(value: string) {
    const validAliasName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!validAliasName.test(value)) {
      this.aliasError = 'Invalid alias name! Use only letters, numbers, and underscores, and start with a letter.';
    } else {
      this.aliasError = ''; 
      this.aliasChange.emit(value);  
    }
  }
}