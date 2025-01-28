import { Routes } from '@angular/router';
import { CreateQueriesComponent} from './create-queries/create-queries.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';

export const routes: Routes = [
	{path: 'query-builder', component: QueryBuilderComponent},
	{path:'create-queries', component: CreateQueriesComponent},
   {path:'', redirectTo:'query-builder', pathMatch:'full'}
];
