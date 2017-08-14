import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../shared';

@Component({
  selector: 'app-users-admin-page',
  templateUrl: './users-admin-page.component.html',
  styleUrls: ['./users-admin-page.component.css']
})
export class UsersAdminPageComponent implements OnInit {
  allUsers: User[];
  users: User[];
  isSubmitting = false;
  filterName: string;
  editingId: any = null;
  edit: {
    First: string,
    Last: string,
    Email: string,
    Skype: string,
    Phone: string,
  };
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.isSubmitting = true;
    this.userService.getUsers()
    .subscribe(data => {
      this.allUsers = data;
      this.users = data;
      this.isSubmitting = false;
    });
  }

  openEdit(id) {
    this.editingId = Number(id);
    const { first, last, email, skype, phone } = this.allUsers.filter(user => user.id === id)[0];
    this.edit = { First: first, Last: last, Email: email, Skype: skype, Phone: phone };
  }

  closeEdit() {
    this.editingId = null;
    this.edit = { First: '', Last: '', Email: '', Skype: '', Phone: '' };
  }

  deleteUser(Id) {
    this.userService.deleteUser(Id)
    .subscribe(data => {
      if (data) {
        this.allUsers = this.allUsers.filter(user => user.id !== data);
        this.users = this.allUsers;
      }
    });
  }

  submitChanges() {
    const User = this.allUsers.find(user => user.id === this.editingId);
    this.userService.updateUser(Object.assign(User, this.edit, { FullName: `${this.edit.First} ${this.edit.Last}` }))
    .subscribe(data => {
      this.allUsers = this.allUsers.map(user => {
        if (user.id === data.id) {
          return data;
        }
        return user;
      });
      this.users = this.allUsers;
      this.closeEdit();
    });
  }

  filterNameChange(val) {
    this.users = this.allUsers.filter(user => user.fullName.toLocaleLowerCase().indexOf(val) !== -1);
  }

}
