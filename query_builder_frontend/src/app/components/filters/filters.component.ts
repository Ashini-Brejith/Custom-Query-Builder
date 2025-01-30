import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {

  @Input() filters: { field: string; operator: string; value: string; condition: string; error: string }[] = [];
  @Output() filtersChange = new EventEmitter<
    { field: string; operator: string; value: string; condition: string; error: string }[]
  >();

  onFieldChange(value: string, index: number) {
    const validFieldName = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!validFieldName.test(value)) {
      this.filters[index].error = 'Invalid field name!';
    } else {
      this.filters[index].error = ''; 
    }
  }

  onFilterChange() {
    this.filtersChange.emit(this.filters);
  }

  addFilter() {
    this.filters.push({ field: '', operator: '=', value: '', condition: 'AND', error: '' });
  }

  removeFilter(index: number) {
    if (this.filters.length > 1) {
      this.filters.splice(index, 1);
    }
  }

}