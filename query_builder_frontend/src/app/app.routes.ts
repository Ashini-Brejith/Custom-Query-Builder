import { Routes } from '@angular/router';
import { CreateQueriesComponent} from './table-queries/create-queries/create-queries.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';

export const routes: Routes = [
	{path: '', component: QueryBuilderComponent},
	{path:'create-queries', component: CreateQueriesComponent},
   {path:'', redirectTo:'-builder', pathMatch:'full'}
];
