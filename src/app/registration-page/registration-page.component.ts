import { Component, OnInit } from '@angular/core';

import { UserService, User } from '../shared';
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
  ) { }

  ngOnInit() {
  }

  submitUser() {
    const { First, Last, Email, LocationId, Birthday, Address, Skype, Phone, PositionId, Password, } = this;
    this.userService.postUser({ First, Last, Email, LocationId: Number(LocationId), Birthday, Address, Skype, Phone, PositionId: Number(PositionId), Password, Projects: [], ImageUrl: '', Roles: [] })
    .subscribe(data => {
      console.log(data);
    })
  }

}
