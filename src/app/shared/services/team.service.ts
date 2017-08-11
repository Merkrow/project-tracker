import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { User } from '../models';

const teamUrl = '/api/team';

@Injectable()
export class TeamService {
  constructor (
    private apiService: ApiService,
  ) {}

  getTeam(projectId): Observable<User[]> {
    return this.apiService.get(`${teamUrl}/${projectId}`);
  }

  removeMember({ projectId, employeeId }): Observable<any> {
    return this.apiService.delete(`${teamUrl}?model.projectId=${projectId}&model.employeeId=${employeeId}`);
  }

  addMember({ projectId, employeeId }): Observable<any> {
    return this.apiService.post(teamUrl, { ProjectId: projectId, EmployeeId: employeeId });
  }

}
