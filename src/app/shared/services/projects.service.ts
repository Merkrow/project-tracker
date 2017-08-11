import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Project } from '../models';

const projectUrl = '/api/projects';

@Injectable()
export class ProjectsService {
  constructor (
    private apiService: ApiService,
  ) {}

  get(): Observable<Project[]> {
    return this.apiService.get(projectUrl);
  }

  getProjectsByUserId(id): Observable<Project[]> {
    return this.apiService.get(`/api/employees/${id}/projects`);
  }

  searchProjects(params): Observable<Project[]> {
    return this.apiService.get(`${projectUrl}/search`, params);
  }

  getProject(id): Observable<Project> {
    return this.apiService.get(`${projectUrl}/${id}`);
  }

  getTickets(id): Observable<Project[]> {
    return this.apiService.get(`${projectUrl}/${id}/tickets`);
  }

  updateProject(params): Observable<Project> {
    return this.apiService.put(projectUrl, params);
  }

  deleteProject(id): Observable<any> {
    return this.apiService.delete(`${projectUrl}/${id}`);
  }

  postProject(project): Observable<any> {
    return this.apiService.post(projectUrl, project);
  }

}
