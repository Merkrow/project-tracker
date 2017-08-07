import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Skill } from '../models';

@Injectable()
export class SkillsService {
  constructor (
    private apiService: ApiService,
  ) {}

  getUserSkills(id): Observable<Skill[]> {
    return this.apiService.get(`/api/skills/${id}`);
  }

  updateUserSkills(params): Observable<Skill> {
    return this.apiService.put(`/api/skills`, params);
  }

  deleteSkill(id, empId): Observable<any> {
    return this.apiService.delete(`/api/skills?id=${id}&empId=${empId}`);
  }

  postSkill(params): Observable<Skill> {
    return this.apiService.post(`/api/skills`, params);
  }

}
