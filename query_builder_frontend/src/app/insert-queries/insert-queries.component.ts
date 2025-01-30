import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QueryGenerateButtonComponent } from '../components/query-generate-button/query-generate-button.component';
import { DisplayQueryComponent } from '../components/display-query/display-query.component';
import { TableSectionComponent } from '../components/table-section/table-section.component';

@Component({
  selector: 'app-insert-queries',
  imports: [
    FormsModule,
    CommonModule,
    TableSectionComponent,
    QueryGenerateButtonComponent, DisplayQueryComponent
  ],
  templateUrl: './insert-queries.component.html',
  styleUrl: './insert-queries.component.css',
})
export class InsertQueriesComponent {
 query = {
    table: '',
    columns: [{ name: '', value: '' }],
  };

  columnError:string='';

  addColumn() {
    this.query.columns.push({ name: '', value: '' });
  }

  removeColumn(index: number) {
    if (this.query.columns.length > 1) {
    this.query.columns.splice(index, 1);
    }
  }

  onColumnChange(value: string): void {
    const validColumnName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!validColumnName.test(value)) {
      this.columnError = 'Invalid column name!';
    } else {
      this.columnError = '';
    }
  }

  generatedQuery: string = '';
  generateQuery() {
    // Validate table and columns
    if (!this.query.table || !this.query.columns.length) {
      alert('Please provide a table name and at least one column.');
      return;
    }

  
    const columnNames = this.query.columns
      .filter((column) => column.name) 
      .map((column) => column.name)
      .join(', ');

    const columnValues = this.query.columns
      .filter((column) => column.value)
      .map((column) => `'${column.value}'`)
      .join(', ');

    if (!columnNames || !columnValues) {
      alert('Please provide valid column names and values.');
      return;
    }

    // Generate the full query string
    this.generatedQuery = `INSERT INTO ${this.query.table} (${columnNames}) VALUES (${columnValues});`;

    console.log('Generated Query:', this.generatedQuery);
  }

}
