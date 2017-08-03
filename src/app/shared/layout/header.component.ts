import { Component, OnInit } from '@angular/core';

import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}
  currentUser: User;
  isAuthenticated: boolean;

  ngOnInit() {
    this.isAuthenticated = false;
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    )
  }
}
