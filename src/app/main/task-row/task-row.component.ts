import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { TimesheetService, Task, Timesheet } from '../../shared';
import util from '../../util';

@Component({
  selector: 'task-row-component',
  templateUrl: './task-row.component.html',
})
export class TaskRowComponent {
  timesheets: Timesheet[];
  cells: any[];
  renderChild: boolean = false;
  constructor (
    private timesheetService: TimesheetService,
  ) {}

  isLogged(date) {
    const { timesheets } = this;
    if (timesheets && timesheets.length) {
      const check = this.timesheets.reduce((acc, timesheet, index) => {
        return moment(moment(util.getDate(timesheet.Date)).format('YYYY-MM-DD')).isSame(date.format('YYYY-MM-DD')) ? index : acc;
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
      return { Date: date };
    })
  }

  addTimesheet(timesheet) {
    this.timesheets = [...this.timesheets, timesheet];
    this.makeInterval();
  }

  updateTimesheet(timesheet) {
    this.timesheets = this.timesheets.map(prev => {
      if (prev.Id === timesheet.Id) {
        return timesheet;
      }
      return prev;
    });
    this.makeInterval();
  }

  ngOnInit() {
    this.timesheetService.getTimesheet(this.task.Id)
    .subscribe(data => {
      this.timesheets = data;
      this.makeInterval();
      this.renderChild = true;
    });
  }

  @Input() task: Task;
  @Input() interval: any[];
  ngOnChanges(changes: any) {
    if(changes.interval) {
      this.makeInterval();
    }
  }

}
