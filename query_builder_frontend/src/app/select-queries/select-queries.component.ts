import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableNameComponent } from '../table-name/table-name.component';
import { TableAliasComponent } from '../table-alias/table-alias.component';
import { QueryGenerateButtonComponent } from '../query-generate-button/query-generate-button.component';
import { JoinQueryComponent } from '../join-query/join-query.component';
import { FiltersComponent } from '../filters/filters.component';
import { LimitComponent } from '../limit/limit.component';
import { SortComponent } from '../sort/sort.component';

@Component({
  selector: 'app-select-queries',
  imports: [
    FormsModule,
    CommonModule,
    TableNameComponent,
    TableAliasComponent,
    JoinQueryComponent,
    FiltersComponent,
    SortComponent,
    LimitComponent,
    QueryGenerateButtonComponent,
  ],
  templateUrl: './select-queries.component.html',
  styleUrl: './select-queries.component.css',
})
export class SelectQueriesComponent {
  query = {
    table: '',
    alias: '',
    columns: ['*'],
    joins: [{ type: 'INNER', table: '', alias: '', on: '' }],
    filters: [{ field: '', operator: '=', value: '', condition: 'AND' }],
    orderBy: { field: '', direction: 'ASC' },
    limit: '',
  };

  // Add a new column to the columns array
  addColumn() {
    this.query.columns.push('');
  }

  // Remove a column by index
  removeColumn(index: number) {
    this.query.columns.splice(index, 1);
  }

  // Define 'generatedQuery' to store the generated query string
  generatedQuery: string = '';

  generateQuery() {
    // Validate table name
    if (!this.query.table) {
      alert('Please provide a table name.');
      return;
    }

    // Handle table with alias
    const table = `${this.query.table}${
      this.query.alias ? ` AS ${this.query.alias}` : ''
    }`;

    // Select columns
    const columns = this.query.columns
      .filter((col) => col.trim() !== '')
      .join(', ');
    const selectColumns = columns || '*';

    // Joins with alias
    const joins = this.query.joins
      .filter((join) => join.table && join.on)
      .map(
        (join) =>
          `${join.type} JOIN ${join.table}${
            join.alias ? ` AS ${join.alias}` : ''
          } ON ${join.on}`
      )
      .join(' ');

    // Filters for WHERE clause
    const filters = this.query.filters
      .filter((filter) => filter.field && filter.value)
      .map((filter) => `${filter.field} ${filter.operator} '${filter.value}'`)
      .join(' AND ');
    const whereClause = filters ? `WHERE ${filters}` : '';

    // ORDER BY clause
    const orderByClause = this.query.orderBy?.field
      ? `ORDER BY ${this.query.orderBy.field} ${this.query.orderBy.direction}`
      : '';

    // LIMIT clause
    const limitClause = this.query.limit ? `LIMIT ${this.query.limit}` : '';

    // Generate the full query string
    this.generatedQuery =
      `SELECT ${selectColumns} FROM ${table} ${joins} ${whereClause} ${orderByClause} ${limitClause}`.trim();

    console.log('Generated Query:', this.generatedQuery);
  }
}
