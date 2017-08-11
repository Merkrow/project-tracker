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

  makeKeys(skill) {
    const { LevelId, LevelName, Name, Id, } = skill;
    return {
      levelId: LevelId,
      levelName: LevelName,
      name: Name,
      id: Id,
    };
  }

  getUserSkills(id): Observable<Skill[]> {
    return this.apiService.get(`${skillUrl}/${id}`)
    .map(skills => skills.map(skill => this.makeKeys(skill)));
  }

  updateUserSkills(params): Observable<Skill> {
    return this.apiService.put(skillUrl, params)
    .map(skill => this.makeKeys(skill));
  }

  deleteSkill(id, empId): Observable<any> {
    return this.apiService.delete(`${skillUrl}?id=${id}&empId=${empId}`);
  }

  postSkill(params): Observable<Skill> {
    return this.apiService.post(skillUrl, params)
    .map(skill => this.makeKeys(skill));
  }

}
