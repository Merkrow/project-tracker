import { Component, Input } from '@angular/core';

import { Timesheet } from '../../../shared';

@Component({
  selector: 'timesheet-popup',
  templateUrl: './timesheet-popup.component.html',
  styleUrls: ['./timesheet-popup.component.css']
})
export class TimesheetPopup {
  comment: string;
  time: number;
  constructor (
  ) {}

  ngOnInit() {
    if (this.Log) {
      this.comment = this.Log.Comment;
    }
    this.time = this.LoggedTime;
  }

  log() {
    this.logTime({ LoggedTime: this.time, Comment: this.comment });
  }

  @Input() logTime: any;
  @Input() Log: Timesheet;
  @Input() LoggedTime: number;
}
