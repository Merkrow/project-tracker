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

  makeKeys(task) {
    const {
      Name,
      Description,
      Estimate,
      StartDate,
      EndDate,
      StatusId,
      ResponsibleId,
      TypeId, ProjectId,
      Reporter,
      Responsible,
      ReporterId,
      Id,
    } = task;
    return {
      name: Name,
      description: Description,
      estimate: Estimate,
      startDate: StartDate,
      endDate: EndDate,
      statusId: StatusId,
      responsibleId: ResponsibleId,
      typeId: TypeId,
      projectId: ProjectId,
      reporter: Reporter,
      responsible: Responsible,
      reporterId: ReporterId,
      id: Id,
    };
  }

  getTaskByProjectId(id): Observable<Task[]> {
    return this.apiService.get(`/api/projects/${id}/tickets`)
    .map(tasks => tasks.map(task => this.makeKeys(task)));
  }

  getTasksByUserId(userId): Observable<Task[]> {
    return this.apiService.get(`${taskUrl}/search?taskSearch.responsibleId=${userId}`)
    .map(tasks => tasks.map(task => this.makeKeys(task)));
  }

  searchTask(params): Observable<Task[]> {
    return this.apiService.get(`${taskUrl}/search`, params)
    .map(tasks => tasks.map(task => this.makeKeys(task)));
  }

  getTaskById(id): Observable<Task> {
    return this.apiService.get(`${taskUrl}/${id}`)
    .map(task => this.makeKeys(task));
  }

  updateTask(params): Observable<Task> {
    return this.apiService.put(taskUrl, params)
    .map(task => this.makeKeys(task));
  }

  deleteTask(Id): Observable<any> {
    return this.apiService.delete(`${taskUrl}/${Id}`);
  }

  postTask(params): Observable<Task> {
    return this.apiService.post(taskUrl, params)
    .map(task => this.makeKeys(task));
  }

}
