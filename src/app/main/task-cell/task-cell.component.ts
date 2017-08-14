import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Timesheet, TimesheetService } from '../../shared';

@Component({
  selector: 'app-task-cell-component',
  templateUrl: './task-cell.component.html',
  styleUrls: ['./task-cell.component.css'],
})
export class TaskCellComponent implements OnInit {
  loggedTime: number;
  Log: Timesheet;
  showPopup = false;
  @Input() addTimesheet: any;
  @Input() updateTimesheet: any;
  @Input() cell: any;
  @Input() taskId: number;
  constructor (
    private timesheetService: TimesheetService,
  ) {}

  logTime({ loggedTime, comment }) {
    if (!this.Log.id) {
      this.timesheetService.logTimesheet({
        TicketId: this.taskId,
        LoggedTime: Number(loggedTime),
        Date: moment(this.cell.date).format('YYYY-MM-DDTHH:mm:ss'),
        Comment: comment
      })
      .subscribe(data => this.addTimesheet(data));
      this.togglePopup();
      return ;
    }
    this.timesheetService.updateTimesheet({
      TicketId: this.taskId,
      LoggedTime: Number(loggedTime),
      Date: moment(this.cell.date).format('YYYY-MM-DDTHH:mm:ss'),
      Comment: comment,
      Id: this.Log.id
    })
    .subscribe(data => this.updateTimesheet(data));
    this.togglePopup();
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  ngOnInit() {
    this.Log = this.cell;
    if (this.Log.id) {
      this.loggedTime = this.Log.loggedTime;
    }
  }
}
