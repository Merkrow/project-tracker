import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment';

import { TimesheetService, Task, Timesheet } from '../../shared';
import util from '../../util';

@Component({
  selector: 'app-task-row-component',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.css']
})
export class TaskRowComponent implements OnInit, OnChanges {
  timesheets: Timesheet[];
  cells: any[];
  renderChild = false;
  @Input() task: Task;
  @Input() interval: any[];
  @Input() emplId: number;
  constructor (
    private timesheetService: TimesheetService,
  ) {}

  isLogged(date) {
    const { timesheets } = this;
    if (timesheets && timesheets.length) {
      const check = this.timesheets.reduce((acc, timesheet, index) => {
        return moment(moment(util.getDate(timesheet.date)).format('YYYY-MM-DD')).isSame(date.format('YYYY-MM-DD')) ? index : acc;
      }, null);
      return check !== null ? this.timesheets[check] : null;
    }
  }

  makeInterval() {
    const { interval, timesheets } = this;
    this.cells = interval.map((date) => {
      const newDate = this.isLogged(date);
      if (newDate) {
        return newDate;
      }
      return { date: date };
    });
  }

  addTimesheet(timesheet) {
    this.timesheets = [...this.timesheets, timesheet];
    this.makeInterval();
  }

  updateTimesheet(timesheet) {
    this.timesheets = this.timesheets.map(prev => {
      if (prev.id === timesheet.id) {
        return timesheet;
      }
      return prev;
    });
    this.makeInterval();
  }

  ngOnInit() {
    if (!this.emplId) {
      this.timesheetService.getTimesheet(this.task.id)
      .subscribe(data => {
        this.timesheets = data;
        this.makeInterval();
        this.renderChild = true;
      });
    } else {
      this.timesheetService.getUserTimesheet({ taskId: this.task.id, empId: this.emplId })
      .subscribe(data => {
        this.timesheets = data;
        this.makeInterval();
        this.renderChild = true;
      });
    }
  }

  ngOnChanges(changes: any) {
    if (changes.interval) {
      this.makeInterval();
    }
  }

}
