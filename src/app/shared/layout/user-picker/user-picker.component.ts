import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'user-picker-component',
  templateUrl: './user-picker.component.html'
})
export class UserPickerComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}
  allUsers: User[];
  users: User[];
  chosenUser: User;
  isSubmitting: boolean = false;

  ngOnInit() {
    this.isSubmitting = true;
    this.userService.getUsers()
    .subscribe(data => {
      this.allUsers = data;
      this.users = data;
      if (this.filters) {
        this.users = this.filterUsers(data);
      }
      if (this.isEmpty) {
        this.isEmpty(this.users.length);
      }
      if (this.employeeId) {
        this.chosenUser = this.allUsers.filter((user) => user.Id === this.employeeId)[0];
      } else if(this.users.length) {
        this.chosenUser = this.users[0];
        this.chooseUser(this.chosenUser.Id);
      }
      this.isSubmitting = false;
    })
  }

  filterUsers(data) {
    return data.filter((user) => {
      return this.filters.findIndex(filter => filter.Id === user.Id) === -1;
    })
  }

  updateUser(Id) {
    this.chooseUser(Id);
  }

  @Input() employeeId: number;
  @Input() chooseUser: any;
  @Input() filters: User[];
  @Input() isEmpty: any;

  ngOnChanges(changes: any) {
    if (changes.filters && this.allUsers && this.allUsers.length) {
      this.users = this.filterUsers(this.allUsers);
      if (this.isEmpty) {
        this.isEmpty(this.users.length);
      }
      if (this.users.length) {
        this.chosenUser = this.users[0];
        this.chooseUser(this.chosenUser.Id);
      }
    }
  }
}
