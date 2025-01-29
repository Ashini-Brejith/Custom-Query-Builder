import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-query',
  imports: [CommonModule, FormsModule],
  templateUrl: './display-query.component.html',
  styleUrl: './display-query.component.css'
})
export class DisplayQueryComponent {
  @Input() generatedQuery: string = ''; 


  copyToClipboard() {
    if (this.generatedQuery) {
      navigator.clipboard.writeText(this.generatedQuery).then(() => {
        alert('Query copied to clipboard!');
      }).catch(err => {
        console.error('Error copying to clipboard: ', err);
      });
    }
  }
}
