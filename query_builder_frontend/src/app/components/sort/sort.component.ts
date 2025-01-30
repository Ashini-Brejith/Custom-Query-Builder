import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort',
  imports: [CommonModule, FormsModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.css',
})
export class SortComponent {
  @Input() orderBy: any = { field: '', direction: 'ASC' };
  @Output() orderByChange = new EventEmitter<any>();

  fieldNameError: string='';

  onFieldChange(value: string) {
    const validFieldName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!validFieldName.test(value)) {
      this.fieldNameError = 'Invalid field name.';
    } else {
      this.fieldNameError = ''; 
    }
  }

  onSortChange() {
    this.orderByChange.emit(this.orderBy);
  }
}
