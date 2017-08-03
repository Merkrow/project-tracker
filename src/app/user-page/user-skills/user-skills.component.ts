import { Component, OnInit, Input } from '@angular/core';

import { SkillsService, Skill } from '../../shared';

@Component({
  selector: 'user-skills-component',
  templateUrl: './user-skills.component.html',
})
export class UserSkillsComponent implements OnInit {
  skills: Skill[];
  constructor(
    private skillsService: SkillsService,
  ) { }

  ngOnInit() {
    this.skillsService.getUserSkills(this.employeeId)
    .subscribe(data => {
      this.skills = data;
    })
  }

  @Input() employeeId: number;

}
