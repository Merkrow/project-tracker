import { Component, Input, ElementRef } from '@angular/core';

import { Timesheet } from '../../../shared';

@Component({
  selector: 'timesheet-popup',
  templateUrl: './timesheet-popup.component.html',
  styleUrls: ['./timesheet-popup.component.css'],
  host: {
   '(document:click)': 'onClick($event)',
  },
})
export class TimesheetPopup {
  comment: string;
  time: number;
  open: boolean = true;
  constructor (
    private _el: ElementRef,
  ) {}

  ngOnInit() {
    if (this.Log) {
      this.comment = this.Log.Comment;
    }
    this.time = this.LoggedTime;
  }

  onClick(event) {
    if (!this._el.nativeElement.contains(event.target)) {
      if (!this.open) {
        this.togglePopup();
      }
      this.open = false;
    }
  }

  log() {
    this.logTime({ LoggedTime: this.time, Comment: this.comment });
  }

  @Input() logTime: any;
  @Input() Log: Timesheet;
  @Input() LoggedTime: number;
  @Input() togglePopup: any;
}
