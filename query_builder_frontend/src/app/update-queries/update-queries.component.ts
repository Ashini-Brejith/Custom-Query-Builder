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
  selector: 'app-update-queries',
  imports: [
    CommonModule,
    FormsModule,
    TableNameComponent,
    TableAliasComponent,
    JoinQueryComponent,
    FiltersComponent,
    SortComponent,
    LimitComponent,
    QueryGenerateButtonComponent,
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

  // Add a new field to the fields array
  addField() {
    this.query.fields.push({ name: '', value: '' });
  }

  // Remove a field by index
  removeField(index: number) {
    this.query.fields.splice(index, 1);
  }

  // Define 'generatedQuery' to store the generated query string
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

    // Handle table with alias
    const table = `${this.query.table}${
      this.query.alias ? ` AS ${this.query.alias}` : ''
    }`;

    // Fields to update
    const fieldsToUpdate = this.query.fields
      .filter((field) => field.name && field.value) // Filter out empty fields
      .map((field) => `${field.name} = '${field.value}'`)
      .join(', ');

    if (!fieldsToUpdate) {
      alert('Please provide values for at least one field.');
      return;
    }

    // Joins with alias
    const joins = this.query.joins
      .filter((join) => join.table && join.on) // Ensure joins have necessary values
      .map(
        (join) =>
          `${join.type} JOIN ${join.table}${
            join.alias ? ` AS ${join.alias}` : ''
          } ON ${join.on}`
      )
      .join(' ');

    // Filters for WHERE clause
    const filters = this.query.filters
      .filter((filter) => filter.field && filter.value) // Ensure filters have values
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
      `UPDATE ${table} SET ${fieldsToUpdate} ${joins} ${whereClause} ${orderByClause} ${limitClause}`.trim();

    console.log('Generated Query:', this.generatedQuery);
  }
}
