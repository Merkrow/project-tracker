import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamService, User } from '../../shared';

@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
})
export class TeamComponent implements OnInit {
  members: User[];
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

  ngOnInit() {
    if (this.projectId) {
      this.teamService.getTeam(this.projectId)
      .subscribe(data => {
        this.members = data.sort((a, b) => a.PositionId - b.PositionId);
      })
    }
  }
  @Input() projectId: number;
}
