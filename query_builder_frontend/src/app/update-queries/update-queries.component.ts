import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-queries',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-queries.component.html',
  styleUrl: './update-queries.component.css'
})
export class UpdateQueriesComponent {
 generatedQuery='';
 submitted=false;

 query={
 table:'',
 updates:[{field:'', value:''}],
 filters:[{field:'', operator:'', value:'', condition:''}]
 };

addUpdate(){
this.query.updates.push({
field:'',
value:''
});
}

removeUpdate(index: number){
this.query.updates.splice(index,1);
}

 addFilter(){
 this.query.filters.push({
 field:'',
 operator:'',
 value:'',
 condition:''
 });
 }

 removeFilter(index:number){
 this.query.filters.splice(index,1);
 }

  onSubmit() {
    this.submitted = true;
    if (!this.query.table) {
      alert('Table name is required.');
      return;
    }
    if (!this.query.updates.length || !this.query.updates[0].field || !this.query.updates[0].value) {
      alert('At least one field and value must be specified for the update.');
      return;
    }
    const table = this.query.table;

    // Process updates
    const updates = this.query.updates
      .filter((update) => update.field && update.value)
      .map((update) => `${update.field} = '${update.value}'`)
      .join(', ');

    // Process filters
    const filters = this.query.filters
      .filter((filter) => filter.field && filter.operator && filter.value)
      .map(
        (filter) =>
          `${filter.field} ${filter.operator} '${filter.value}' ${filter.condition || ''}`
      )
      .join(' ')
      .trim();
    const whereClause = filters ? `WHERE ${filters}` : '';
    
    const query = `UPDATE ${table} SET ${updates} ${whereClause}`.trim();
    this.generatedQuery = query;
    console.log('Generated Query:', query);
  }
}
