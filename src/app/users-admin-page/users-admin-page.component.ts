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
  isSubmitting: boolean = false;
  filterName: string;
  editingId: any = null;
  edit: {
    First: string,
    Last: string,
    Email: string,
    Skype: string,
    Phone: number,
  }
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
    })
  }

  openEdit(id) {
    this.editingId = Number(id);
    const { First, Last, Email, Skype, Phone } = this.allUsers.filter(user => user.Id === id)[0];
    this.edit = { First, Last, Email, Skype, Phone };
  }

  closeEdit() {
    this.editingId = null;
  }

  deleteUser(Id) {
    this.userService.deleteUser(Id)
    .subscribe(data => {
      if (data) {
        this.allUsers = this.allUsers.filter(user => user.Id !== data);
        this.users = this.allUsers;
      }
    });
  }

  submitChanges() {
    const User = this.allUsers.filter(user => user.Id === this.editingId)[0];
    this.closeEdit();
    this.userService.updateUser(Object.assign(User, this.edit, { FullName: `${this.edit.First} ${this.edit.Last}` }))
    .subscribe(data => {
      this.allUsers = this.allUsers.map(user => {
        if (user.Id === data.Id) {
          return data;
        }
        return user;
      })
      this.users = this.allUsers;
    })
  }

  filterNameChange(val) {
    this.users = this.allUsers.filter(user => user.FullName.toLocaleLowerCase().indexOf(val) !== -1);
  }

}
