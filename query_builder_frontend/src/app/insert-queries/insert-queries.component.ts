import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insert-queries',
  imports: [FormsModule, CommonModule],
  templateUrl: './insert-queries.component.html',
  styleUrl: './insert-queries.component.css'
})
export class InsertQueriesComponent {
	query = {
	table: '',
	fields: [{name: '', value:''}]
	};
	
	addField(){
		this.query.fields.push({name: '', value:''});
	}

	removeField(index: number){
		this.query.fields.splice(index, 1);
	}

	onSubmit(){
		const queryPreview = `INSERT INTO ${this.query.table} (${this.query.fields.map((f)=>f.name).join(',')}) VALUES (${this.query.fields.map((f)=>`' ${f.value}'`).join(',')})`;
	}
}
