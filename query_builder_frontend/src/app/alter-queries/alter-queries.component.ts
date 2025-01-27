import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {QueryGenerateButtonComponent} from '../query-generate-button/query-generate-button.component'
import {TableNameComponent} from '../table-name/table-name.component'

@Component({
  selector: 'app-alter-queries',
  imports: [FormsModule, CommonModule, QueryGenerateButtonComponent, TableNameComponent],
  templateUrl: './alter-queries.component.html',
  styleUrl: './alter-queries.component.css'
})
export class AlterQueriesComponent {
 query = {
    table: '',
    oldColumnName: '', 
    newColumnName: '', 
    newColumn: {
      name: '', 
      type: '', 
    },
  };

  generatedQuery: string = '';

  generateQuery() {
    if (!this.query.table) {
      alert('Please provide the table name.');
      return;
    }

    if (this.query.newColumn.name && this.query.newColumn.type) {
      this.generatedQuery = `ALTER TABLE ${this.query.table} ADD COLUMN ${this.query.newColumn.name} ${this.query.newColumn.type};`;
    }
   
    else if (this.query.oldColumnName && this.query.newColumnName) {
      this.generatedQuery = `ALTER TABLE ${this.query.table} RENAME COLUMN ${this.query.oldColumnName} TO ${this.query.newColumnName};`;
    } else {
      alert('Please provide the necessary details for adding or renaming a column.');
      return;
    }  
}
}
