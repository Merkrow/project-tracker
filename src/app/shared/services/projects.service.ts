import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Project } from '../models';

@Injectable()
export class ProjectsService {
  constructor (
    private apiService: ApiService,
  ) {}

  get(): Observable<Project[]> {
    return this.apiService.get(`/api/projects`);
  }

  getProjectsByUserId(id): Observable<Project[]> {
    return this.apiService.get(`/api/employees/${id}/projects`);
  }

  getProject(id): Observable<Project> {
    return this.apiService.get(`/api/projects/${id}`);
  }

  getTickets(id): Observable<Project[]> {
    return this.apiService.get(`/api/projects/${id}/tickets`);
  }

  updateProject(params): Observable<Project> {
    return this.apiService.put(`/api/projects`, params);
  }

  deleteProject(id): Observable<any> {
    return this.apiService.delete(`/api/projects/${id}`);
  }

  postProject(project): Observable<any> {
    return this.apiService.post(`/api/projects`, project);
  }

}
