import { Component } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { TableQueriesComponent } from '../table-queries/table-queries.component';
import { SelectQueriesComponent } from '../select-queries/select-queries.component';
import { InsertQueriesComponent } from '../insert-queries/insert-queries.component';
import { UpdateQueriesComponent } from '../update-queries/update-queries.component';
import { DeleteQueriesComponent } from '../delete-queries/delete-queries.component';


@Component({
  selector: 'app-query-builder',
  imports: [TableQueriesComponent, SelectQueriesComponent, InsertQueriesComponent, UpdateQueriesComponent, DeleteQueriesComponent,  NgIf, CommonModule],
  templateUrl: './query-builder.component.html',
  styleUrl: './query-builder.component.css',
})
export class QueryBuilderComponent {
  currentPage: string = 'table';
  selectPage(page: string) {
    this.currentPage = page;
  }
}
