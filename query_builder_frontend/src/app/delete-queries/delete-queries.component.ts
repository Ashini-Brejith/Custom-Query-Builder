import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QueryGenerateButtonComponent } from '../components/query-generate-button/query-generate-button.component';
import { JoinQueryComponent } from '../components/join-query/join-query.component';
import { FiltersComponent } from '../components/filters/filters.component';
import { LimitComponent } from '../components/limit/limit.component';
import { SortComponent } from '../components/sort/sort.component';
import { DisplayQueryComponent } from '../components/display-query/display-query.component';
import { TableSectionComponent } from '../components/table-section/table-section.component';

@Component({
  selector: 'app-delete-queries',
  imports: [
    CommonModule,
    FormsModule,
    TableSectionComponent,
    JoinQueryComponent,
    FiltersComponent,
    SortComponent,
    LimitComponent,
    QueryGenerateButtonComponent, DisplayQueryComponent],
  templateUrl: './delete-queries.component.html',
  styleUrl: './delete-queries.component.css',
})
export class DeleteQueriesComponent {
  query = {
    table: '',
    alias: '',
    joins: [{ type: 'INNER', table: '', alias: '', on: '', error: '' }],
    filters: [{ field: '', operator: '=', value: '', condition: 'AND', error: '' }],
    limit: '',
    orderBy: { field: '', direction: 'ASC' },
  };

  generatedQuery: string = '';

  validateField() {
    const validColumnName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    this.query.filters.forEach((filter, index) => {
      if (!filter.field || !validColumnName.test(filter.field)) {
        filter.error = `Column name "${filter.field}" is invalid`;
      } else {
        filter.error = '';
      }
    });
  }

  validateJoin() {
    const validTableName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    const validAliasName = /^[a-zA-Z][a-zA-Z0-9_]*$/;

    this.query.joins.forEach((join) => {
      join.table = join.table.trim();
      join.alias = join.alias.trim();

      let errors = [];

      if (!join.table || !validTableName.test(join.table)) {
        errors.push(`Table name "${join.table}" is invalid`);
      }

      if (join.alias && !validAliasName.test(join.alias)) {
        errors.push(`Table alias "${join.alias}" is invalid`);
      }

      if (!join.on) {
        errors.push(`Join condition (ON clause) is required`);
      }

      join.error = errors.length ? errors.join(', ') : '';
    });
  }

  generateQuery() {

    if (!this.query.table) {
      alert('Please provide a table name.');
      return;
    }

    const table = `${this.query.table}${this.query.alias ? ` AS ${this.query.alias}` : ''
      }`;

    const joins = this.query.joins
      .filter((join) => join.table && join.on)
      .map(
        (join) =>
          `${join.type} JOIN ${join.table}${join.alias ? ` AS ${join.alias}` : ''
          } ON ${join.on}`
      )
      .join(' ');

    this.validateJoin();
    const invalidJoin = this.query.joins.find(join => join.error);
    if (invalidJoin) {
      alert(this.query.joins.map(join => join.error).join('\n'));
      return;
    }


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

    if (!filters) {
      alert('Please provide values for atleast one field.')
    }

    this.validateField();
    const invalidField = this.query.filters.find(filter => filter.error);
    if (invalidField) {
      alert(this.query.filters.map(filter => filter.error).join('\n'));
      return;
    }

    const orderByClause = this.query.orderBy?.field
      ? `ORDER BY ${this.query.orderBy.field} ${this.query.orderBy.direction}`
      : '';

    const limitClause = this.query.limit ? `LIMIT ${this.query.limit}` : '';

    this.generatedQuery =
      `DELETE FROM ${table} ${joins} ${whereClause} ${orderByClause} ${limitClause}`.trim();

    console.log('Generated Query:', this.generatedQuery);
  }
}
