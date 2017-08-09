import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../shared';

@Component({
  selector: 'team-member-component',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
  }

  @Input() member: User;
  @Input() removeMember: any;
  @Input() isAdminOrPm: boolean;
}
