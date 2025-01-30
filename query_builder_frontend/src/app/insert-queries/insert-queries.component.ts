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
    columns: [{ name: '', value: '' ,error:''}],
  };

  columnError:string='';

  addColumn() {
    this.query.columns.push({ name: '', value: '' , error:''});
  }

  removeColumn(index: number) {
    if (this.query.columns.length > 1) {
    this.query.columns.splice(index, 1);
    }
  }
  validateColumns() {
    const validColumnName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    this.query.columns.forEach((column, index) => {
      if (!column.name || !validColumnName.test(column.name)) {
        column.error = `Column name "${column.name}" is invalid`;
      } else {
        column.error = ''; 
      }
    });
  }

  generatedQuery: string = '';
  generateQuery() {
    if (!this.query.table || !this.query.columns.length) {
      alert('Please provide a valid table name and at least one column.');
      return;
    }

    this.validateColumns();
    const invalidColumn = this.query.columns.find(column => column.error);
    if (invalidColumn) {
      alert(this.query.columns.map(column => column.error).join('\n'));
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

    this.generatedQuery = `INSERT INTO ${this.query.table} (${columnNames}) VALUES (${columnValues});`;

    console.log('Generated Query:', this.generatedQuery);
  }

}
