import { Component, OnInit, Input } from '@angular/core';

import { UserService, User } from '../../shared';
import staticData from '../../shared/staticData';

@Component({
  selector: 'app-user-info-component',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  employee: User;
  @Input() employeeId: number;

  staticData = staticData;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getUserById(this.employeeId)
    .subscribe(data => {
      this.employee = data;
    });
  }

}
