import { Component, OnInit, Input } from '@angular/core';

import { UserService, User } from '../../shared';

@Component({
  selector: 'user-info-component',
  templateUrl: './user-info.component.html',
})
export class UserInfoComponent implements OnInit {
  employee: User;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getUserById(this.employeeId)
    .subscribe(data => {
      this.employee = data;
    })
  }

  @Input() employeeId: number;

}
