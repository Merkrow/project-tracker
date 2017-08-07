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

}
