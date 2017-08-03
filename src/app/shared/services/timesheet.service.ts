import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Timesheet } from '../models';

@Injectable()
export class TimesheetService {
  constructor (
    private apiService: ApiService,
  ) {}

  getTimesheet(id): Observable<Timesheet[]> {
    return this.apiService.get(`/api/timesheets/search?query.taskId=${id}`)
    .map(data => data);
  }

  logTimesheet(params): Observable<Timesheet> {
    return this.apiService.post(`/api/timesheets`, params)
    .map(data => data);
  }

  updateTimesheet(params): Observable<Timesheet> {
    return this.apiService.put(`/api/timesheets`, params)
    .map(data => data);
  }

}
