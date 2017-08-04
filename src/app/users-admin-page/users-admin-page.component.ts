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
    FullName: string,
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
  }

  closeEdit() {
    this.editingId = null;
  }

  deleteUser(Id) {
    this.userService.deleteUser(Id)
    .subscribe(data => {
      if (data) {
        this.allUsers = this.allUsers.filter(user => user.Id !== Number(data));
      }
    });
  }

  filterNameChange(val) {
    this.users = this.allUsers.filter(user => user.FullName.toLocaleLowerCase().indexOf(val) !== -1);
  }

}
