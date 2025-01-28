import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableNameComponent } from '../table-name/table-name.component';
import { TableAliasComponent } from '../table-alias/table-alias.component';
import { QueryGenerateButtonComponent } from '../query-generate-button/query-generate-button.component';
import { JoinQueryComponent } from '../join-query/join-query.component';
import { FiltersComponent } from '../filters/filters.component';
import { LimitComponent } from '../limit/limit.component';
import { SortComponent } from '../sort/sort.component';

@Component({
  selector: 'app-delete-queries',
  imports: [
    CommonModule,
    FormsModule,
    TableNameComponent,
    TableAliasComponent,
    JoinQueryComponent,
    FiltersComponent,
    SortComponent,
    LimitComponent,
    QueryGenerateButtonComponent,],
  templateUrl: './delete-queries.component.html',
  styleUrl: './delete-queries.component.css',
})
export class DeleteQueriesComponent {
  query = {
    table: '',
    alias: '',
    joins: [{ type: 'INNER', table: '', alias: '', on: '' }],
    filters: [{ field: '', operator: '=', value: '', condition: 'AND' }],
    limit: '',
    orderBy: { field: '', direction: 'ASC' },
  };

  generatedQuery: string = '';

  generateQuery() {
   
    if (!this.query.table) {
      alert('Please provide a table name.');
      return;
    }

    const table = `${this.query.table}${
      this.query.alias ? ` AS ${this.query.alias}` : ''
    }`;

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
    .map(
      (filter, index, filteredFilters) => {
        const condition = index < filteredFilters.length - 1 ? ` ${filter.condition}` : '';
        return `${filter.field} ${filter.operator} '${filter.value}'${condition}`;
      }
    )
    .join(' ');

  const whereClause = filters ? `WHERE ${filters}` : '';

    const orderByClause = this.query.orderBy?.field
      ? `ORDER BY ${this.query.orderBy.field} ${this.query.orderBy.direction}`
      : '';

    const limitClause = this.query.limit ? `LIMIT ${this.query.limit}` : '';

    this.generatedQuery =
      `DELETE FROM ${table} ${joins} ${whereClause} ${orderByClause} ${limitClause}`.trim();

    console.log('Generated Query:', this.generatedQuery);
  }
}
