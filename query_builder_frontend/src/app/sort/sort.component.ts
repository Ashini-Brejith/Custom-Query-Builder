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

  onSortChange() {
    this.orderByChange.emit(this.orderBy);
  }
}
