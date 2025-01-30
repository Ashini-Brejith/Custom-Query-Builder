import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QueryGenerateButtonComponent } from '../components/query-generate-button/query-generate-button.component';
import { JoinQueryComponent } from '../components/join-query/join-query.component';
import { FiltersComponent } from '../components/filters/filters.component';
import { LimitComponent } from '../components/limit/limit.component';
import { SortComponent } from '../components/sort/sort.component';
import { DisplayQueryComponent } from '../components/display-query/display-query.component';
import { TableSectionComponent } from '../components/table-section/table-section.component';

@Component({
  selector: 'app-select-queries',
  imports: [
    FormsModule,
    CommonModule,
    TableSectionComponent,
    JoinQueryComponent,
    FiltersComponent,
    SortComponent,
    LimitComponent,
    QueryGenerateButtonComponent, DisplayQueryComponent
  ],
  templateUrl: './select-queries.component.html',
  styleUrl: './select-queries.component.css',
})
export class SelectQueriesComponent {
  query = {
    table: '',
    alias: '',
    columns: [{ name: '*', error: '' }],
    joins: [{ type: 'INNER', table: '', alias: '', on: '', error: '' }],
    filters: [{ field: '', operator: '=', value: '', condition: 'AND', error: '' }],
    orderBy: { field: '', direction: 'ASC' },
    limit: '',
  };

  addColumn() {
    this.query.columns.push({ name: '', error: '' });
  }

  removeColumn(index: number) {
    if (this.query.columns.length > 1) {
      this.query.columns.splice(index, 1);
    }
  }
  validateColumns() {
    const validColumnName = /^[a-zA-Z][a-zA-Z0-9_]*$|^\*$/;
    this.query.columns.forEach((column, index) => {
      if (!column.name || !validColumnName.test(column.name)) {
        column.error = `Column name "${column.name}" is invalid`;
      } else {
        column.error = '';
      }
    });
  }

  validateField() {
    const validColumnName = /^[a-zA-Z][a-zA-Z0-9_]*$|^\*$/;
    this.query.filters.forEach((filter) => {
      if (filter.field && !validColumnName.test(filter.field)) {
        filter.error = `Field name "${filter.field}" is invalid`;
      } else {
        filter.error = '';
      }
    });
  }

  generatedQuery: string = '';

  generateQuery() {
    if (!this.query.table) {
      alert('Please provide a valid table name.');
      return;
    }

    this.validateColumns();
    const invalidColumn = this.query.columns.find(column => column.error);
    if (invalidColumn) {
      alert(this.query.columns.map(column => column.error).join('\n'));
      return;
    }

    this.validateField();
    const invalidField = this.query.filters.find(filter => filter.error);
    if (invalidField) {
      alert(this.query.filters.map(filter => filter.error).join('\n'));
      return;
    }


    const table = `${this.query.table}${this.query.alias ? ` AS ${this.query.alias}` : ''
      }`;

    const columns = this.query.columns
      .filter((col) => col.name.trim() !== '')
      .map((col) => col.name)
      .join(', ');
    const selectColumns = columns || '*';

    const joins = this.query.joins
      .filter((join) => join.table && join.on)
      .map(
        (join) =>
          `${join.type} JOIN ${join.table}${join.alias ? ` AS ${join.alias}` : ''
          } ON ${join.on}`
      )
      .join(' ');


    const filters = this.query.filters
      .filter((filter) => filter.field && filter.value)
      .map((filter, index, filteredFilters) => {
        const condition =
          index < filteredFilters.length - 1 ? ` ${filter.condition}` : '';
        return `${filter.field} ${filter.operator} '${filter.value}'${condition}`;
      })
      .join(' ');

    const whereClause = filters ? `WHERE ${filters}` : '';



    const orderByClause = this.query.orderBy?.field
      ? `ORDER BY ${this.query.orderBy.field} ${this.query.orderBy.direction}`
      : '';

    const limitClause = this.query.limit ? `LIMIT ${this.query.limit}` : '';

    this.generatedQuery =
      `SELECT ${selectColumns} FROM ${table} ${joins} ${whereClause} ${orderByClause} ${limitClause}`.trim();

    console.log('Generated Query:', this.generatedQuery);
  }
}
