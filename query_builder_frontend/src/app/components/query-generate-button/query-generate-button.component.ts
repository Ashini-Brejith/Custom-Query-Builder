import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-query-generate-button',
  imports: [],
  templateUrl: './query-generate-button.component.html',
  styleUrl: './query-generate-button.component.css',
})
export class QueryGenerateButtonComponent {
  @Output() generate = new EventEmitter<void>();

  onGenerate() {
    this.generate.emit();
  }
}
