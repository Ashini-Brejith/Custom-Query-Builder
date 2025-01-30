import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QueryGenerateButtonComponent } from '../../components/query-generate-button/query-generate-button.component';
import { DisplayQueryComponent } from '../../components/display-query/display-query.component';
import { TableSectionComponent } from '../../components/table-section/table-section.component';

@Component({
  selector: 'app-create-queries',
  imports: [FormsModule, CommonModule, TableSectionComponent, QueryGenerateButtonComponent, DisplayQueryComponent],
  templateUrl: './create-queries.component.html',
  styleUrl: './create-queries.component.css',
})
export class CreateQueriesComponent {
  generatedQuery = '';
  table: string = '';
  columns: Array<any> = [
    {
      name: '',
      type: '',
      length: '',
      notNull: false,
      primaryKey: false,
      unique: false,
      error: ''
    },
  ];

  addColumn(): void {
    this.columns.push({
      name: '',
      type: '',
      length: '',
      notNull: false,
      primaryKey: false,
      unique: false,
      error: ''
    });
  }

  removeColumn(index: number): void {
    if (this.columns.length > 1) {
      this.columns.splice(index, 1);
    }
  }

  validateColumns() {
    const validColumnName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    
    this.columns.forEach((column, index) => {
      if (!column.name || !validColumnName.test(column.name)) {
        column.error = `Column name "${column.name}" is invalid.`;
      } else {
        column.error = ''; 
      }
    });
  }

  generateQuery() {
    if (!this.table) {
      alert('PLease provide a valid table name');
      return;
    }

    this.validateColumns();
    const invalidColumn = this.columns.find(column => column.error);
    if (invalidColumn) {
      alert(this.columns.map(column => column.error).join('\n'));
      return;
    }

    const query = `CREATE TABLE ${this.table} (${this.columns
      .map((column) => {
        let columnQuery = `${column.name} ${column.type.toUpperCase()}`;
        if (column.length) {
          columnQuery += `(${column.length})`;
        }
        if (column.notNull) {
          columnQuery += ' NOT NULL';
        }
        if (column.primaryKey) {
          columnQuery += ' PRIMARY KEY';
        }
        if (column.unique) {
          columnQuery += ' UNIQUE';
        }
        return columnQuery;
      })
      .join(',\n')});`;
    this.generatedQuery = query;
    console.log('Generated Query:', this.generatedQuery);
  }
}
