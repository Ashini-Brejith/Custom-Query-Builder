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
import { DisplayQueryComponent } from '../display-query/display-query.component';

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
    QueryGenerateButtonComponent, DisplayQueryComponent
  ],
  templateUrl: './select-queries.component.html',
  styleUrl: './select-queries.component.css',
})
export class SelectQueriesComponent {
  query = {
    table: '',
    alias: '',
    columns: [{ name: '*' }],
    joins: [{ type: 'INNER', table: '', alias: '', on: '' }],
    filters: [{ field: '', operator: '=', value: '', condition: 'AND' }],
    orderBy: { field: '', direction: 'ASC' },
    limit: '',
  };

  addColumn() {
    this.query.columns.push({ name: '' });
  }

  removeColumn(index: number) {
    if (this.query.columns.length > 1) {
    this.query.columns.splice(index, 1);
    }
  }

  generatedQuery: string = '';

  generateQuery() {
    if (!this.query.table) {
      alert('Please provide a table name.');
      return;
    }

    const table = `${this.query.table}${
      this.query.alias ? ` AS ${this.query.alias}` : ''
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
          `${join.type} JOIN ${join.table}${
            join.alias ? ` AS ${join.alias}` : ''
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
