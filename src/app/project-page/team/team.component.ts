import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamService, User } from '../../shared';

@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  members: User[];
  isSubmitting: boolean = false;
  addUser: boolean = false;
  chosenUserId: number;
  constructor(
    private teamService: TeamService,
  ) { }

  removeMember(employeeId) {
    const { projectId } = this;
    this.teamService.removeMember({ projectId, employeeId })
    .subscribe(data => {
      this.members = this.members.filter(member => member.Id !== data.EmployeeId);
    })
  }

  chooseUser(Id) {
    this.chosenUserId = Number(Id);
  }

  toggleAddUser() {
    if (!this.addUser) {
      this.addUser = true;
      return;
    }
    this.teamService.addMember({ projectId: this.projectId, employeeId: this.chosenUserId })
    .subscribe(data => {
      this.members = this.members.concat(data).sort((a, b) => a.PositionId - b.PositionId);
    })
  }

  cancelAddUser() {
    this.addUser = false;
  }

  ngOnInit() {
    this.isSubmitting = true;
    if (this.projectId) {
      this.teamService.getTeam(this.projectId)
      .subscribe(data => {
        this.members = data.sort((a, b) => a.PositionId - b.PositionId);
        this.isSubmitting = false;
      })
    }
  }
  @Input() projectId: number;
}
