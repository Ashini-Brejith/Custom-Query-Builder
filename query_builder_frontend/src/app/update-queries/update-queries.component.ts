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
  selector: 'app-update-queries',
  imports: [
    CommonModule,
    FormsModule,
    TableSectionComponent,
    JoinQueryComponent,
    FiltersComponent,
    SortComponent,
    LimitComponent,
    QueryGenerateButtonComponent,
    DisplayQueryComponent,
  ],
  templateUrl: './update-queries.component.html',
})
export class UpdateQueriesComponent {
  query = {
    table: '',
    alias: '',
    fields: [{ name: '', value: '', error: '' }],
    joins: [{ type: 'INNER', table: '', alias: '', on: '', error: '' }],
    filters: [{ field: '', operator: '=', value: '', condition: 'AND', error: '' }],
    limit: '',
    orderBy: { field: '', direction: 'ASC' },
  };

  fieldNameError: string = '';

  addField() {
    this.query.fields.push({ name: '', value: '', error: '' });
  }

  removeField(index: number) {
    if (this.query.fields.length > 1) {
      this.query.fields.splice(index, 1);
    }
  }

  validateColumns() {
    const validColumnName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    this.query.fields.forEach((column, index) => {
      if (!column.name || !validColumnName.test(column.name)) {
        column.error = `Column name "${column.name}" is invalid`;
      } else {
        column.error = '';
      }
    });
  }

  validateField() {
    const validColumnName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    this.query.filters.forEach((filter, index) => {
      if (!filter.field || !validColumnName.test(filter.field)) {
        filter.error = `Field name is invalid`;
      } else {
        filter.error = '';
      }
    });
  }


  generatedQuery: string = '';
  generateQuery() {
    if (
      !this.query.table ||
      !this.query.fields ||
      this.query.fields.length === 0
    ) {
      alert('Please provide a table name and at least one field to update.');
      return;
    }
    const table = `${this.query.table}${this.query.alias ? ` AS ${this.query.alias}` : ''
      }`;

      this.validateColumns();
      const invalidColumn = this.query.fields.find(column => column.error);
      if (invalidColumn) {
        alert(this.query.fields.map(column => column.error).join('\n'));
        return;
      }

      this.validateField();
      const invalidField = this.query.filters.find(filter => filter.error);
      if (invalidField) {
        alert(this.query.filters.map(filter => filter.error).join('\n'));
        return;
      }

    const fieldsToUpdate = this.query.fields
      .filter((field) => field.name && field.value)
      .map((field) => `${field.name} = '${field.value}'`)
      .join(', ');

    if (!fieldsToUpdate) {
      alert('Please provide values for atleast one field.');
      return;
    }

    const joins = this.query.joins
      .filter(join => join.table && join.on)
      .map(
        join =>
          `${join.type} JOIN ${join.table.trim()}${join.alias ? ` AS ${join.alias.trim()}` : ''} ON ${join.on}`
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
      `UPDATE ${table} SET ${fieldsToUpdate} ${joins} ${whereClause} ${orderByClause} ${limitClause}`.trim();

    console.log('Generated Query:', this.generatedQuery);
  }
}
