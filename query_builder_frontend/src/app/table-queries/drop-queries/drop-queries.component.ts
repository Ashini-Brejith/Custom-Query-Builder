import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QueryGenerateButtonComponent } from '../../components/query-generate-button/query-generate-button.component';
import { DisplayQueryComponent } from '../../components/display-query/display-query.component';
import { TableSectionComponent } from '../../components/table-section/table-section.component';

@Component({
  selector: 'app-drop-queries',
  imports: [FormsModule, CommonModule, QueryGenerateButtonComponent, TableSectionComponent, DisplayQueryComponent],
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
