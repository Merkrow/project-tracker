import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../shared';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  authType: String = '';
  authForm: FormGroup;
  title: String = '';
  errors: Errors = new Errors();
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.authForm = this.fb.group({
      'Login': ['roger.federer@dataart.com', Validators.required],
      'Password': ['111111', Validators.required],
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    });
  }

  submitForm(email, password) {
    this.isSubmitting = true;
    this.errors = new Errors();
    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/main'),
      err => {
        this.errors = Object.assign(this.errors.errors, err);
        this.isSubmitting = false;
      }
    );
  }
}
