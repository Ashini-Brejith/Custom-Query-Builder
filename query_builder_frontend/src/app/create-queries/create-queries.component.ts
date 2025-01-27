import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-queries',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-queries.component.html',
  styleUrl: './create-queries.component.css',
})
export class CreateQueriesComponent {
  submitted: boolean  = false;
generatedQuery= '';

	tableName: string = '';
  columns: Array<any> = [
    {
      name: '',
      type: '',
      length: '',
      notNull: false,
      primaryKey: false,
      unique: false,
    },
  ];

  addColumn(): void {
    this.columns.push({
      name: '',
      type: '',
      length: '',
      notNull: false,
      primaryKey: false,
      unique: false,
    });
  }

  removeColumn(): void {
    if (this.columns.length > 1) {
      this.columns.pop();
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (!this.tableName) {
      alert('Table name is required.');
      return;
    }

    for (const column of this.columns) {
      if (!column.name || !column.type) {
        alert('Both column name and type are required.');
        return;
      }
    }

    const query = `CREATE TABLE ${this.tableName} (${this.columns
      .map((column) => {
        let columnQuery = `${column.name} ${column.type.toUpperCase()}`;
        if (column.length) {
          columnQuery += `(${column.length})`;
        }
        if (column.notNull) {
          columnQuery += ' NOT NULL';
        }
        if (column.primaryKey) {
          columnQuery += ' PRIMARY KEY';
        }
        if (column.unique) {
          columnQuery += ' UNIQUE';
        }
        return columnQuery;
      })
      .join(',\n')});`;
this.generatedQuery = query;
console.log('Generated Query:',this.generatedQuery);
 }
}
