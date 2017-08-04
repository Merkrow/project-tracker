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

  getTasksByUserId(userId): Observable<Task[]> {
    return this.apiService.get(`/api/tasks/search?taskSearch.responsibleId=${userId}`)
    .map(data => data);
  }

  getTaskById(id): Observable<Task> {
    return this.apiService.get(`/api/tasks/${id}`)
    .map(data => data);
  }

  updateTask(params): Observable<Task> {
    return this.apiService.put(`/api/tasks`, params)
    .map(data => data);
  }

  deleteTask(Id): Observable<any> {
    return this.apiService.delete(`/api/tasks/${Id}`)
    .map(data => data);
  }

}
