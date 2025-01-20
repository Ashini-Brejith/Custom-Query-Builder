import { Component } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { CreateQueriesComponent } from '../create-queries/create-queries.component';
import { SelectQueriesComponent } from '../select-queries/select-queries.component';
import { InsertQueriesComponent } from '../insert-queries/insert-queries.component';
import { UpdateQueriesComponent } from '../update-queries/update-queries.component';
import { DeleteQueriesComponent } from '../delete-queries/delete-queries.component';


@Component({
  selector: 'app-query-builder',
  imports: [CreateQueriesComponent, SelectQueriesComponent, InsertQueriesComponent, UpdateQueriesComponent, DeleteQueriesComponent,  NgIf, CommonModule],
  templateUrl: './query-builder.component.html',
  styleUrl: './query-builder.component.css',
})
export class QueryBuilderComponent {
  currentPage: string = 'create';
  selectPage(page: string) {
    this.currentPage = page;
  }
}
