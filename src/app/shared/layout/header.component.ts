import { Component, OnInit } from '@angular/core';

import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}
  currentUser: User;
  isAuthenticated: boolean;
  isAdmin: boolean = false;
  isPm: boolean = false;

  ngOnInit() {
    this.isAuthenticated = false;
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
    this.userService.isAdmin.subscribe(
      (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    )
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    )
    this.userService.isPm.subscribe(
      (isPm) => {
        this.isPm = isPm;
      }
    )
  }
}
