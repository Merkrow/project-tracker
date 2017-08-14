import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'app-user-picker-component',
  templateUrl: './user-picker.component.html'
})
export class UserPickerComponent implements OnInit, OnChanges {
  constructor(
    private userService: UserService
  ) {}
  allUsers: User[];
  users: User[];
  chosenUser: User;
  isSubmitting = false;
  @Input() employeeId: number;
  @Input() chooseUser: any;
  @Input() filters: User[];
  @Input() isEmpty: any;

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
        this.chosenUser = this.allUsers.filter((user) => user.id === this.employeeId)[0];
      } else if (this.users.length) {
        this.chosenUser = this.users[0];
        this.chooseUser(this.chosenUser.id);
      }
      this.isSubmitting = false;
    });
  }

  filterUsers(data) {
    return data.filter((user) => {
      return this.filters.findIndex(filter => filter.id === user.id) === -1;
    });
  }

  updateUser(id) {
    this.chooseUser(id);
  }

  ngOnChanges(changes: any) {
    if (changes.filters && this.allUsers && this.allUsers.length) {
      this.users = this.filterUsers(this.allUsers);
      if (this.isEmpty) {
        this.isEmpty(this.users.length);
      }
      if (this.users.length) {
        this.chosenUser = this.users[0];
        this.chooseUser(this.chosenUser.id);
      }
    }
  }
}
