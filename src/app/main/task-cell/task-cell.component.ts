import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { Timesheet, TimesheetService } from '../../shared';

@Component({
  selector: 'task-cell-component',
  templateUrl: './task-cell.component.html',
})
export class TaskCellComponent {
  LoggedTime: number;
  Log: Timesheet;
  showPopup: boolean = false;
  constructor (
    private timesheetService: TimesheetService,
  ) {}

  logTime({ LoggedTime, Comment }) {
    if (!this.Log.Id) {
      this.timesheetService.logTimesheet({ TicketId: this.taskId, LoggedTime: Number(LoggedTime), Date: this.cell.Date, Comment })
      .subscribe(data => this.addTimesheet(data));
      this.togglePopup();
      return ;
    }
    this.timesheetService.updateTimesheet({ TicketId: this.taskId, LoggedTime: Number(LoggedTime), Date: this.cell.Date, Comment, Id: this.Log.Id })
    .subscribe(data =>this.updateTimesheet(data));
    this.togglePopup();
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  ngOnInit() {
    this.Log = this.cell;
    if (this.Log.Id) {
      this.LoggedTime = this.Log.LoggedTime;
    }
  }

  @Input() addTimesheet: any;
  @Input() updateTimesheet: any;
  @Input() cell: any;
  @Input() taskId: number;
}
