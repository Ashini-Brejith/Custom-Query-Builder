import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-create-queries',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-queries.component.html',
  styleUrl: './create-queries.component.css',
})
export class CreateQueriesComponent {
	  tableName: string = '';
	  columns: Array<any> = [
    {
      name: '',
      type: '',
      length: '',
      notNull: false,
      primaryKey: false,
      unique: false,
    },
  ]
 

  addColumn(): void {
    this.columns.push({
      name: '',
      type: '',
      length: '',
      notNull: false,
      primaryKey: false,
      unique: false,
    });
  }

  removeColumn(): void {
    if (this.columns.length > 1) {
      this.columns.pop();
    }
  }

  onSubmit(): void {
    console.log('Form Submitted', this.columns);
    //alert(`CREATE TABLE ${this.tableName} (${this.columns.map((c)=>`${c.name} ${c.type.toUpperCase()}`).join(',')})`);
  }
}
