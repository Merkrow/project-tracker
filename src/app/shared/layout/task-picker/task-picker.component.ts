import { Component, OnInit, Input } from '@angular/core';
import staticData from '../../staticData';

@Component({
  selector: 'app-task-picker-component',
  templateUrl: './task-picker.component.html'
})
export class TaskPickerComponent implements OnInit {
  chosenId = '1';
  ObjectKeys = Object.keys;
  @Input() initial: number;
  @Input() chooseId: any;
  @Input() arr: string[];
  @Input() type: string;
  @Input() filter: any[];

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
    if (this.initial && !this.filter) {
      this.chosenId = this.initial.toString();
    }
    if (this.filter) {
      this.arr = this.filterArr(this.arr);
    }
  }

  filterArr(arr) {
    if (this.filter) {
      const filter = this.filter.map(item => item.name);
      const res = Object.keys(arr).reduce((acc, key) => {
        if (filter.indexOf(arr[key]) !== -1) {
          return acc;
        }
        return Object.assign(acc, { [key]: arr[key] });
      }, {});
      this.chosenId = Object.keys(res)[0];
      return res;
    }
    return arr;
  }

}
