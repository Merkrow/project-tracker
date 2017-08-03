import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Task, Timesheet } from '../models';

@Injectable()
export class TaskService {
  constructor (
    private apiService: ApiService,
  ) {}

  getTaskByProjectId(id): Observable<Task[]> {
    return this.apiService.get(`/api/projects/${id}/tickets`)
    .map(data => data);
  }

}
