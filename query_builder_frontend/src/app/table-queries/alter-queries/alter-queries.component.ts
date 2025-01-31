import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QueryGenerateButtonComponent } from '../../components/query-generate-button/query-generate-button.component';
import { DisplayQueryComponent } from '../../components/display-query/display-query.component';
import { TableSectionComponent } from '../../components/table-section/table-section.component';

@Component({
  selector: 'app-alter-queries',
  imports: [FormsModule, CommonModule, TableSectionComponent, QueryGenerateButtonComponent, DisplayQueryComponent],
  templateUrl: './alter-queries.component.html',
  styleUrl: './alter-queries.component.css'
})
export class AlterQueriesComponent {
  query = {
    table: '',
    oldColumnName: '',
    newColumnName: '',
    newColumn: {
      name: '',
      type: '',
    },
  };

  generatedQuery: string = '';
  columnError: string = '';
  oldColumnError: string = '';
  newColumnError: string = '';

  validateColumnName(name: string): boolean {
    const validColumnName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    return validColumnName.test(name);
  }

  validateNewColumnName() {
    if (this.query.newColumn.name && !this.validateColumnName(this.query.newColumn.name)) {
      this.newColumnError = 'Invalid new column name!';
      return false;
    }
    return true;
  }

  validateOldColumnName() {
    if (this.query.oldColumnName && !this.validateColumnName(this.query.oldColumnName)) {
      this.oldColumnError = 'Invalid old column name!';
      return false;
    }
    this.oldColumnError = ''; 
    return true;
  }

  generateQuery() {
    if (!this.query.table) {
      alert('Please provide the valid table name.');
      return;
    }

    if (this.query.newColumn.name && !this.validateNewColumnName()) {
      alert('Please provide a valid new column name!');
      return;
    }

    if (this.query.oldColumnName && !this.validateOldColumnName()) {
      alert('Please provide a valid old column name!');
      return;
    }

    if (this.query.newColumn.name && this.query.newColumn.type) {
      this.generatedQuery = `ALTER TABLE ${this.query.table} ADD COLUMN ${this.query.newColumn.name} ${this.query.newColumn.type.toUpperCase()};`;
    } else if (this.query.oldColumnName && this.query.newColumnName) {
      this.generatedQuery = `ALTER TABLE ${this.query.table} RENAME COLUMN ${this.query.oldColumnName} TO ${this.query.newColumnName};`;
    } else {
      alert('Please provide the necessary details for adding or renaming a column.');
      return;
    }
  }
}