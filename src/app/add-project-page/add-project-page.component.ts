import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

import { ProjectsService } from '../shared';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.css']
})
export class AddProjectPageComponent implements OnInit {
  StartDate: string = moment().format('DD-MM-YYYY');
  EndDate: string = moment().format('DD-MM-YYYY');
  projectForm: FormGroup;

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.projectForm = this.fb.group({
      'Name': ['', Validators.required],
      'Description': [''],
      'CustomerName': ['', Validators.required],
    })

  }

  ngOnInit() {
  }

  submitProject() {
    const project = this.projectForm.value;
    const { StartDate, EndDate } = this;
    this.projectsService.postProject(Object.assign(project, { StartDate, EndDate }))
    .subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/admin/projects');
      }
    })
  }

}
