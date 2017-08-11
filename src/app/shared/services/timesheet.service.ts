import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Timesheet } from '../models';

const timesheetUrl = '/api/timesheets';

@Injectable()
export class TimesheetService {
  constructor (
    private apiService: ApiService,
  ) {}

  makeKeys(user) {
    const { LoggedTime, Date, TicketId, Comment, Id } = user;
    return {
      loggedTime: LoggedTime,
      date: Date,
      ticketId: TicketId,
      comment: Comment,
      id: Id,
    };
  }

  getTimesheet(id): Observable<Timesheet[]> {
    return this.apiService.get(`${timesheetUrl}/search?query.taskId=${id}`)
    .map(timesheets => timesheets.map(timesheet => this.makeKeys(timesheet)));
  }

  getUserTimesheet(params): Observable<Timesheet[]> {
    return this.apiService.get(`${timesheetUrl}/search`, params)
    .map(timesheets => timesheets.map(timesheet => this.makeKeys(timesheet)));
  }

  logTimesheet(params): Observable<Timesheet> {
    return this.apiService.post(timesheetUrl, params)
    .map(timesheet => this.makeKeys(timesheet));
  }

  updateTimesheet(params): Observable<Timesheet> {
    return this.apiService.put(timesheetUrl, params)
    .map(timesheet => this.makeKeys(timesheet));
  }

}
