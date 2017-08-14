import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.populate();
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl(`/login`);
        } else {
          this.router.navigateByUrl(`/main`);
        }
      }
    );
  }
}
