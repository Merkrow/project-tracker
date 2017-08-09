import { Component, OnInit, Input } from '@angular/core';

import { SkillsService, Skill, UserService } from '../../shared';

@Component({
  selector: 'user-skills-component',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.css']
})
export class UserSkillsComponent implements OnInit {
  skills: Skill[];
  addingSkill: boolean = false;
  isCurrent: boolean = false;
  isAdmin: boolean = false;
  isPm: boolean = false;
  constructor(
    private skillsService: SkillsService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.skillsService.getUserSkills(this.employeeId)
    .subscribe(data => {
      this.skills = data;
    })

    this.userService.isAdmin.subscribe(
      (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    )

    this.userService.isPm.subscribe(
      (isPm) => {
        this.isPm = isPm;
      }
    )

    this.userService.currentUser.subscribe(
      (user) => {
        this.isCurrent = user.Id === this.employeeId;
      }
    )
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
