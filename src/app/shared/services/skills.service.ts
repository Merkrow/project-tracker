import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Skill } from '../models';

const skillUrl = '/api/skills';

@Injectable()
export class SkillsService {
  constructor (
    private apiService: ApiService,
  ) {}

  getUserSkills(id): Observable<Skill[]> {
    return this.apiService.get(`${skillUrl}/${id}`);
  }

  updateUserSkills(params): Observable<Skill> {
    return this.apiService.put(skillUrl, params);
  }

  deleteSkill(id, empId): Observable<any> {
    return this.apiService.delete(`${skillUrl}?id=${id}&empId=${empId}`);
  }

  postSkill(params): Observable<Skill> {
    return this.apiService.post(skillUrl, params);
  }

}
