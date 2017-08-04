import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared';
import staticData from '../shared/staticData';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  First: string;
  Last: string;
  Email: string;
  LocationId: string = '1';
  Birthday: string = '2017-08-03T15:21:08.902Z';
  Address: string;
  Skype: string;
  Phone: string;
  PositionId: string = '1';
  Password: string;
  ObjectKeys = Object.keys;
  staticData = staticData;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  submitUser() {
    const { First, Last, Email, LocationId, Birthday, Address, Skype, Phone, PositionId, Password, } = this;
    this.userService.postUser({ First, Last, Email, LocationId: Number(LocationId), Birthday, Address, Skype, Phone, PositionId: Number(PositionId), Password, Projects: [], ImageUrl: '', Roles: [] })
    .subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/admin/users');
      }
    })
  }

}
