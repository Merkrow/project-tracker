import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Task, Timesheet } from '../models';

const taskUrl = '/api/tasks';

@Injectable()
export class TaskService {
  constructor (
    private apiService: ApiService,
  ) {}

  getTaskByProjectId(id): Observable<Task[]> {
    return this.apiService.get(`/api/projects/${id}/tickets`);
  }

  getTasksByUserId(userId): Observable<Task[]> {
    return this.apiService.get(`${taskUrl}/search?taskSearch.responsibleId=${userId}`);
  }

  searchTask(params): Observable<Task[]> {
    return this.apiService.get(`${taskUrl}/search`, params);
  }

  getTaskById(id): Observable<Task> {
    return this.apiService.get(`${taskUrl}/${id}`);
  }

  updateTask(params): Observable<Task> {
    return this.apiService.put(taskUrl, params);
  }

  deleteTask(Id): Observable<any> {
    return this.apiService.delete(`${taskUrl}/${Id}`);
  }

  postTask(params): Observable<Task> {
    return this.apiService.post(taskUrl, params);
  }

}
