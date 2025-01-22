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
    alias:'',
    fields: '',
    filters: [{ field: '', operator: '', value: '', condition: '' }],
    joins: [{ type: 'INNER', table: '', alias: '', on: '' }], 
    orderBy: { field: '', direction: 'ASC' },
    limit: null,
  };

  //Add new filter
  addFilter() {
    this.query.filters.push({
      field: '',
      operator: '',
      value: '',
      condition: '',
    });
  }

  //Remove filter
  removeFilter(index: number) {
    this.query.filters.splice(index, 1);
  }

  //Add new join
  addJoin() {
    this.query.joins.push({
      type: 'INNER', 
      table: '',
      alias:'',
      on: '',
    });
  }

  //Remove join
  removeJoin(index: number) {
    this.query.joins.splice(index, 1);
  }

  onSubmit() {
    this.submitted = true;

    if (!this.query.table) {
      alert('Table name is required.');
      return;
    }

    const fields = this.query.fields || '*';
    const tableAlias = this.query.alias? `AS ${this.query.alias}` :'';

    const table = `${this.query.table}${tableAlias}`; 
    
    //joins
    const joins = this.query.joins
      .filter((join) => join.table && join.on)
      .map((join) =>{
	     const alias = join.alias? `AS ${join.alias}`:''
	      return `${join.type} JOIN ${join.table} ${alias} ON ${join.on}`;
      })
      .join(' ');

    //filters
    const filters = this.query.filters
      .filter((filter) => filter.field && filter.operator && filter.value)
      .map(
        (filter) =>
          `${filter.field} ${filter.operator} '${filter.value}' ${filter.condition ? filter.condition : ''}`
      )
      .join(' ')
      .trim();

    const whereClause = filters ? `WHERE ${filters}` : '';

    //orderBy
    const orderBy = this.query.orderBy.field
      ? `ORDER BY ${this.query.orderBy.field} ${this.query.orderBy.direction}`
      : '';

    //limit
    const limit = this.query.limit ? `LIMIT ${this.query.limit}` : '';

    //generate query
    const query = `SELECT ${fields} FROM ${table} ${joins} ${whereClause} ${orderBy} ${limit}`.trim();

    this.generatedQuery = query;
    console.log('Generated Query:', query);
  }
}
