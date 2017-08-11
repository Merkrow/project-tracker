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

  getTimesheet(id): Observable<Timesheet[]> {
    return this.apiService.get(`${timesheetUrl}/search?query.taskId=${id}`);
  }

  getUserTimesheet(params): Observable<Timesheet[]> {
    return this.apiService.get(`${timesheetUrl}/search`, params);
  }

  logTimesheet(params): Observable<Timesheet> {
    return this.apiService.post(timesheetUrl, params);
  }

  updateTimesheet(params): Observable<Timesheet> {
    return this.apiService.put(timesheetUrl, params);
  }

}
