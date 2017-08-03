import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { User } from '../models';

@Injectable()
export class TeamService {
  constructor (
    private apiService: ApiService,
  ) {}

  getTeam(projectId): Observable<User[]> {
    return this.apiService.get(`/api/team/${projectId}`)
    .map(data => data);
  }

  removeMember({ projectId, employeeId }): Observable<any> {
    return this.apiService.delete(`/api/team?model.projectId=${projectId}&model.employeeId=${employeeId}`)
    .map(data => data);
  }

  addMember({ projectId, employeeId }): Observable<any> {
    return this.apiService.post(`/api/team`, { ProjectId: projectId, EmployeeId: employeeId })
    .map(data => data);
  }

}
