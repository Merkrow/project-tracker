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
    return this.apiService.get(`/api/projects`)
    .map(data => data);
  }

  getProjectsByUserId(id): Observable<Project[]> {
    return this.apiService.get(`/api/employees/${id}/projects`)
    .map(data => data);
  }

  getProject(id): Observable<Project> {
    return this.apiService.get(`/api/projects/${id}`)
    .map(data => data);
  }

  getTickets(id): Observable<Project[]> {
    return this.apiService.get(`/api/projects/${id}/tickets`)
    .map(data => data);
  }

}
