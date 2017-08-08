import { Component, OnInit, Input } from '@angular/core';

import { SkillsService, Skill } from '../../shared';

@Component({
  selector: 'user-skills-component',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.css']
})
export class UserSkillsComponent implements OnInit {
  skills: Skill[];
  addingSkill: boolean = false;
  constructor(
    private skillsService: SkillsService,
  ) { }

  ngOnInit() {
    this.skillsService.getUserSkills(this.employeeId)
    .subscribe(data => {
      this.skills = data;
    })
  }

  deleteSkill(Id) {
    this.skills = this.skills.filter(skill => skill.Id !== Id);
  }

  toggleAddingSkill() {
    this.addingSkill = !this.addingSkill;
  }

  addSkill(skill) {
    if (!this.skills.find(item => item.Id === skill.Id)) {
      this.skills = this.skills.concat(skill);
    } else {
      this.updateSkill(skill);
    }
  }

  updateSkill(skill) {
    this.skills = this.skills.map(prev => {
      if (prev.Id === skill.Id) {
        return skill;
      }
      return prev;
    })
  }

  @Input() employeeId: number;

}
