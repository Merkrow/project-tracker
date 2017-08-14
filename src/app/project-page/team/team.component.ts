import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamService, User, UserService, } from '../../shared';

@Component({
  selector: 'app-team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  members: User[];
  isSubmitting = false;
  addUser = false;
  chosenUserId: number;
  isPm = false;
  isAdmin = false;
  disableButton = false;
  @Input() projectId: number;
  constructor(
    private teamService: TeamService,
    private userService: UserService,
  ) { }

  removeMember(employeeId) {
    const { projectId } = this;
    this.teamService.removeMember({ projectId, employeeId })
    .subscribe(data => {
      this.members = this.members.filter(member => member.id !== data.EmployeeId);
    });
  }

  chooseUser(id) {
    this.chosenUserId = Number(id);
  }

  isEmpty(length) {
    this.disableButton = !length;
  }

  toggleAddUser() {
    if (!this.addUser) {
      this.addUser = true;
      return;
    }
    this.teamService.addMember({ projectId: this.projectId, employeeId: this.chosenUserId })
    .subscribe(data => {
      this.members = this.members.concat(data).sort((a, b) => a.positionId - b.positionId);
    });
  }

  cancelAddUser() {
    this.addUser = false;
    this.disableButton = false;
  }

  ngOnInit() {
    this.isSubmitting = true;
    if (this.projectId) {
      this.teamService.getTeam(this.projectId)
      .subscribe(data => {
        this.members = data.sort((a, b) => a.positionId - b.positionId);
        this.isSubmitting = false;
      });
    }
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
  }
}
