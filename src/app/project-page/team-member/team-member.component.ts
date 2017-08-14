import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../shared';

@Component({
  selector: '[team-member-component]',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {
  @Input() member: User;
  @Input() removeMember: any;
  @Input() isAdminOrPm: boolean;
  constructor(
  ) { }

  ngOnInit() {
  }

}
