import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {QueryGenerateButtonComponent} from '../query-generate-button/query-generate-button.component';
import {TableNameComponent} from '../table-name/table-name.component';
import { DisplayQueryComponent } from '../display-query/display-query.component';

@Component({
  selector: 'app-drop-queries',
  imports: [FormsModule, CommonModule, QueryGenerateButtonComponent, TableNameComponent, DisplayQueryComponent],
  templateUrl: './drop-queries.component.html',
  styleUrl: './drop-queries.component.css',
})
export class DropQueriesComponent {
  query = {
    table: '',
  };

  generatedQuery: string = '';

  generateQuery() {
    if (!this.query.table) {
      alert('Please provide a table name.');
      return;
    }

    this.generatedQuery = `DROP TABLE ${this.query.table};`;
  }
}
