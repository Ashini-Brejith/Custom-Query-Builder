import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-join-query',
  imports: [CommonModule, FormsModule],
  templateUrl: './join-query.component.html',
  styleUrl: './join-query.component.css',
})
export class JoinQueryComponent {
  @Input() joins: any[] = [];
  @Output() joinsChange = new EventEmitter<any[]>();

  onJoinChange() {
    this.joinsChange.emit(this.joins);
  }
  addJoin() {
    this.joins.push({
      type: 'INNER', // default join type
      table: '',
      alias: '',
      on: '',
    });
  }

  removeJoin(index: number) {
    this.joins.splice(index, 1);
  }
}
