import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-queries',
  imports: [FormsModule, CommonModule],
  templateUrl: './select-queries.component.html',
  styleUrl: './select-queries.component.css',
})
export class SelectQueriesComponent {
  generatedQuery = '';
  submitted = false;

  query = {
    table: '',
    fields: '',
    filters: [{ field: '', operator: '', value: '', condition: '' }],
    orderBy: { field: '', direction: 'ASC' },
    limit: null,
  };
  addFilter() {
    this.query.filters.push({
      field: '',
      operator: '',
      value: '',
      condition: '',
    });
  }
  removeFilter(index: number) {
    this.query.filters.splice(index, 1);
  }

  onSubmit() {
    this.submitted = true;
    if (!this.query.table) {
      return;
    }
    let query = 'SELECT ';
    if (this.query.fields) {
      query += this.query.fields;
    } else {
      query += '*';
    }

    if (this.query.table) {
      query += ' FROM ' + this.query.table;

      if (this.query.filters[0].field.length > 0) {
        query += ' WHERE ';
        for (let i = 0; i < this.query.filters.length; i++) {
          query +=
            this.query.filters[i].field +
            ' ' +
            this.query.filters[i].operator +
            " '" +
            this.query.filters[i].value +
            "'";
          if (i < this.query.filters.length - 1) {
            query += ' ' + this.query.filters[i].condition + ' ';
          }
        }
      }

      if (this.query.orderBy.field) {
        query +=
          ' ORDER BY ' +
          this.query.orderBy.field +
          ' ' +
          this.query.orderBy.direction;
      }

      if (this.query.limit) {
        query += ' LIMIT ' + this.query.limit;
      }
    }

    this.generatedQuery = query;
  }
}
