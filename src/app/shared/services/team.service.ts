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

  makeKeys(user) {
    const { Password, Address, LocationId, Birthday, Email, FullName, First, Last, Id, ImageUrl, Phone, PositionId, Projects, Roles, Skype, Position } = user;
    return {
      address: Address,
      locationId: LocationId,
      email: Email,
      birthday: Birthday,
      fullName: FullName,
      first: First,
      last: Last,
      id: Id,
      imageUrl: ImageUrl,
      phone: Phone,
      positionId: PositionId,
      projects: Projects,
      roles: Roles,
      skype: Skype,
      position: Position,
    };
  }

  getTeam(projectId): Observable<User[]> {
    return this.apiService.get(`${teamUrl}/${projectId}`)
    .map(users => users.map(user => this.makeKeys(user)));
  }

  removeMember({ projectId, employeeId }): Observable<any> {
    return this.apiService.delete(`${teamUrl}?model.projectId=${projectId}&model.employeeId=${employeeId}`);
  }

  addMember({ projectId, employeeId }): Observable<User> {
    return this.apiService.post(teamUrl, { ProjectId: projectId, EmployeeId: employeeId })
    .map(user => this.makeKeys(user));
  }

}
