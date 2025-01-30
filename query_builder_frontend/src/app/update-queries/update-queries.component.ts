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
    QueryGenerateButtonComponent, DisplayQueryComponent
  ],
  templateUrl: './update-queries.component.html',
})
export class UpdateQueriesComponent {
  query = {
    table: '',
    alias: '',
    fields: [{ name: '', value: '' }],
    joins: [{ type: 'INNER', table: '', alias: '', on: '' }],
    filters: [{ field: '', operator: '=', value: '', condition: 'AND' }],
    limit: '',
    orderBy: { field: '', direction: 'ASC' },
  };

  addField() {
    this.query.fields.push({ name: '', value: '' });
  }

  removeField(index: number) {
    if (this.query.fields.length > 1) {
    this.query.fields.splice(index, 1);
    }
  }

  generatedQuery: string = '';
  generateQuery() {
    // Validate table and fields
    if (
      !this.query.table ||
      !this.query.fields ||
      this.query.fields.length === 0
    ) {
      alert('Please provide a table name and at least one field to update.');
      return;
    }

    const table = `${this.query.table}${
      this.query.alias ? ` AS ${this.query.alias}` : ''
    }`;

    const fieldsToUpdate = this.query.fields
      .filter((field) => field.name && field.value) // Filter out empty fields
      .map((field) => `${field.name} = '${field.value}'`)
      .join(', ');

    if (!fieldsToUpdate) {
      alert('Please provide values for atleast one field.');
      return;
    }

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
      `UPDATE ${table} SET ${fieldsToUpdate} ${joins} ${whereClause} ${orderByClause} ${limitClause}`.trim();

    console.log('Generated Query:', this.generatedQuery);
  }
}
