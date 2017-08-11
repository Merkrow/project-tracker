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

  makeKeys(project) {
    const { Name, Id, Description, CustomerName, StartDate, EndDate, Tickets, ImageUrl, } = project;
    return {
      name: Name,
      id: Id,
      description: Description,
      customerName: CustomerName,
      startDate: StartDate,
      endDate: EndDate,
      tickets: Tickets,
      imageUrl: ImageUrl,
    };
  }

  get(): Observable<Project[]> {
    return this.apiService.get(projectUrl)
    .map(projects => projects.map(project => this.makeKeys(project)));
  }

  getProjectsByUserId(id): Observable<Project[]> {
    return this.apiService.get(`/api/employees/${id}/projects`)
    .map(projects => projects.map(project => this.makeKeys(project)));
  }

  searchProjects(params): Observable<Project[]> {
    return this.apiService.get(`${projectUrl}/search`, params)
    .map(projects => projects.map(project => this.makeKeys(project)));
  }

  getProject(id): Observable<Project> {
    return this.apiService.get(`${projectUrl}/${id}`)
    .map(project => this.makeKeys(project));
  }

  getTickets(id): Observable<Project[]> {
    return this.apiService.get(`${projectUrl}/${id}/tickets`)
    .map(projects => projects.map(project => this.makeKeys(project)));
  }

  updateProject(params): Observable<Project> {
    return this.apiService.put(projectUrl, params)
    .map(project => this.makeKeys(project));
  }

  deleteProject(id): Observable<any> {
    return this.apiService.delete(`${projectUrl}/${id}`);
  }

  postProject(project): Observable<Project> {
    return this.apiService.post(projectUrl, project)
    .map(project => this.makeKeys(project));
  }

}
