import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Input() filters: { field: string; operator: string; value: string; condition:string }[] = [];
  @Output() filtersChange = new EventEmitter<
    { field: string; operator: string; value: string, condition:string }[]
  >();

  fieldNameError: string='';

  onFieldChange(value: string) {
    const validTableName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!validTableName.test(value)) {
      this.fieldNameError = 'Invalid field Name';
    } else {
      this.fieldNameError = ''; 
    }
  }

  onFilterChange() {
    this.filtersChange.emit(this.filters);
  }
  addFilter() {
    this.filters.push({ field: '', operator: '=', value: '', condition:'AND' });
  }

  removeFilter(index: number) {
    if (this.filters.length > 1) {
    this.filters.splice(index, 1);
  }
}
}
