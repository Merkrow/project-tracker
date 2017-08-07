import { Component, OnInit, Input } from '@angular/core';
import staticData from '../../staticData';

@Component({
  selector: 'task-picker-component',
  templateUrl: './task-picker.component.html'
})
export class TaskPickerComponent implements OnInit {
  chosenId: number;

  constructor(
  ) {}

  onChange(Id) {
    if (this.type) {
      this.chooseId({ Id: Number(Id), type: this.type });
      return;
    }
    this.chooseId({ Id: Number(Id) });
  }

  ngOnInit() {
    if (this.initial) {
      this.chosenId = (this.initial - 1);
    } else {
      this.chosenId = 0;
    }
  }

  @Input() initial: number;
  @Input() chooseId: any;
  @Input() arr: string[];
  @Input() type: string;
}
