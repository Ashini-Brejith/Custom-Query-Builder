import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateQueriesComponent } from '../create-queries/create-queries.component';
import { AlterQueriesComponent } from '../alter-queries/alter-queries.component';

import { DropQueriesComponent } from '../drop-queries/drop-queries.component';

@Component({
  selector: 'app-table-queries',
  imports: [
    FormsModule,
    CommonModule,
    CreateQueriesComponent,
    AlterQueriesComponent,
    DropQueriesComponent,
  ],
  templateUrl: './table-queries.component.html',
  styleUrl: './table-queries.component.css',
})
export class TableQueriesComponent {
  currentTab: string = 'create';
  activeTab(tab: string) {
    this.currentTab = tab;
  }
}
