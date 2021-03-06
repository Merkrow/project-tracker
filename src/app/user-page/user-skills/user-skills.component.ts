import { Component, OnInit, Input } from '@angular/core';

import { SkillsService, Skill, UserService } from '../../shared';

@Component({
  selector: 'app-user-skills-component',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.css']
})
export class UserSkillsComponent implements OnInit {
  skills: Skill[];
  addingSkill = false;
  isCurrent = false;
  isAdmin = false;
  isPm = false;
  @Input() employeeId: number;

  constructor(
    private skillsService: SkillsService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.skillsService.getUserSkills(this.employeeId)
    .subscribe(data => {
      this.skills = data;
    });

    this.userService.isAdmin.subscribe(
      (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    );

    this.userService.isPm.subscribe(
      (isPm) => {
        this.isPm = isPm;
      }
    );

    this.userService.currentUser.subscribe(
      (user) => {
        this.isCurrent = user.id === Number(this.employeeId);
      }
    );
  }

  deleteSkill(id) {
    this.skills = this.skills.filter(skill => skill.id !== id);
  }

  toggleAddingSkill() {
    this.addingSkill = !this.addingSkill;
  }

  addSkill(skill) {
    if (!this.skills.find(item => item.id === skill.id)) {
      this.skills = this.skills.concat(skill);
    } else {
      this.updateSkill(skill);
    }
  }

  updateSkill(skill) {
    this.skills = this.skills.map(prev => {
      if (prev.id === skill.id) {
        return skill;
      }
      return prev;
    });
  }

}
