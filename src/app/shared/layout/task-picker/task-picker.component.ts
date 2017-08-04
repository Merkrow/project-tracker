import { Component, OnInit, Input } from '@angular/core';
import staticData from '../../staticData';

@Component({
  selector: 'task-picker-component',
  templateUrl: './task-picker.component.html'
})
export class TaskPickerComponent implements OnInit {
  data: any;
  ObjectKeys = Object.keys;
  chosenTask: string;

  constructor(
  ) {}

  changeTask(Id) {
    this.chooseTaskId({ Id: Number(Id), type: this.pickType });
  }

  ngOnInit() {
    this.chosenTask = this.initialTask.toString();
    switch (this.pickType) {
      case "status":
        this.data = staticData.ticketStatus;
        return;
      case "type":
        this.data = staticData.ticketType;
        return;
      default:
        this.data = staticData.ticketStatus;
        return;
    }
  }

  @Input() pickType: string;
  @Input() initialTask: number;
  @Input() chooseTaskId: any;
}
