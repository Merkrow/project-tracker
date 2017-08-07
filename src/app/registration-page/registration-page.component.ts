import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

import { UserService } from '../shared';
import staticData from '../shared/staticData';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  ObjectKeys = Object.keys;
  staticData = staticData;
  Birthday: string = moment().format('DD-MM-YYYY');
  registrationForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.registrationForm = this.fb.group({
      'First': ['', Validators.required],
      'Last': ['', Validators.required],
      'Email': ['', Validators.required],
      'LocationId': ['1', Validators.required],
      'Address': ['', Validators.required],
      'Skype': ['', Validators.required],
      'Phone': ['', Validators.required],
      'PositionId': ['1', Validators.required],
      'Password': ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  submitUser() {
    const user = this.registrationForm.value;
    const { Birthday } = this;
    this.userService.postUser(Object.assign(user, { Birthday: moment(Birthday).format("YYYY-MM-DDTHH:mm:ss"), Projects: [], ImageUrl: '', Roles: [], LocationId: Number(user.LocationId), PositionId: Number(user.PositionId) }))
    .subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/admin/users');
      }
    })
  }

}
