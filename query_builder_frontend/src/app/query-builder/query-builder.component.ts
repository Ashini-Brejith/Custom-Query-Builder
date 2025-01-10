

import { Component } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import {CreateQueriesComponent} from '../create-queries/create-queries.component';

@Component({
selector: 'app-query-builder',
imports: [CreateQueriesComponent, NgIf, CommonModule],
templateUrl: './query-builder.component.html',
styleUrl: './query-builder.component.css'
})
export class QueryBuilderComponent {
currentPage: string = 'create';
	     selectPage(page: string){
		     this.currentPage = page;
	     }
}
