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

  onFilterChange() {
    this.filtersChange.emit(this.filters); // Emit the updated filters array
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
