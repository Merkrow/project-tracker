import { Component, OnInit, Input } from '@angular/core';

import { Skill, SkillsService } from '../../../shared';
import staticData from '../../../shared/staticData';

@Component({
  selector: 'skill-component',
  templateUrl: './skill.component.html',
})
export class SkillComponent implements OnInit {
  skills: Skill[];
  edit: boolean = false;
  skillLevelId: number;
  save: boolean = true;
  staticData: {} = staticData;

  constructor(
    private skillsService: SkillsService,
  ) { }

  ngOnInit() {
    this.skillLevelId = this.skill.LevelId;
  }

  updateLevel(skillLevelId) {
    this.skillLevelId = skillLevelId;
    this.save = false;
  }

  submitChanges() {
    if (!this.save) {
      this.skillsService.updateUserSkills({ SkillId: this.skill.Id, LevelId: Number(this.skillLevelId), EmployeeId: this.EmployeeId })
      .subscribe(data => {
        this.save = true;
        this.updateSkill(data);
      })
    }
    this.toggleEdit();
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  @Input() skill: Skill;
  @Input() EmployeeId: number;
  @Input() updateSkill: any;
}
