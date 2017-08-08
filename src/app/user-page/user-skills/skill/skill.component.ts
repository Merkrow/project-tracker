import { Component, OnInit, Input } from '@angular/core';

import { Skill, SkillsService } from '../../../shared';
import staticData from '../../../shared/staticData';

@Component({
  selector: 'skill-component',
  templateUrl: './skill.component.html',
})
export class SkillComponent implements OnInit {
  edit: boolean = false;
  skillLevelId: number = 1;
  save: boolean = true;
  staticData = staticData;
  skillNameId: number = 1;

  constructor(
    private skillsService: SkillsService,
  ) { }

  ngOnInit() {
    if (!this.addingSkill) {
      this.skillLevelId = this.skill.LevelId;
      this.skillNameId = Number(Object.keys(staticData.skillName).filter(index => staticData.skillName[index] === this.skill.Name ? index : 1));
    } else {
      this.toggleEdit();
    }
  }

  updateLevel(skillLevelId) {
    this.skillLevelId = skillLevelId.Id;
    this.save = false;
  }

  updateSkillNameId(skillNameId) {
    this.save = false;
    this.skillNameId = skillNameId.Id;
  }

  submitChanges() {
    if (this.addingSkill) {
      this.skillsService.postSkill({ LevelId: Number(this.skillLevelId), EmployeeId: this.EmployeeId, SkillId: this.skillNameId })
      .subscribe(data => {
        this.addSkill(data);
        this.save = true;
      })
      this.toggleEdit();
      this.toggleAddingSkill();
      return;
    }
    if (!this.save) {
      this.skillsService.updateUserSkills({ SkillId: this.skill.Id, LevelId: Number(this.skillLevelId), EmployeeId: this.EmployeeId })
      .subscribe(data => {
        this.save = true;
        this.updateSkill(data);
      })
    }
    this.toggleEdit();
  }

  deleteSkill() {
    this.skillsService.deleteSkill(this.skill.Id, this.EmployeeId)
    .subscribe(data => {
      if (data) {
        this.removeSkill(data);
      }
    })
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  @Input() skill: Skill;
  @Input() EmployeeId: number;
  @Input() updateSkill: any;
  @Input() removeSkill: any;
  @Input() addingSkill: boolean;
  @Input() toggleAddingSkill: any;
  @Input() addSkill: any;
}
