import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-limit',
  imports: [CommonModule, FormsModule],
  templateUrl: './limit.component.html',
  styleUrl: './limit.component.css',
})
export class LimitComponent {
  @Input() limit: string = '';
  @Output() limitChange = new EventEmitter<string>();

  onLimitChange() {
    this.limitChange.emit(this.limit);
  }
}
