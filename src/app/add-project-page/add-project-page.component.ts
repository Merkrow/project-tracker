import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectsService } from '../shared';

@Component({
  selector: 'app-add-project-page',
  templateUrl: './add-project-page.component.html',
  styleUrls: ['./add-project-page.component.css']
})
export class AddProjectPageComponent implements OnInit {
  Name: string;
  Description: string;
  CustomerName: string;
  StartDate: string = "2017-08-03T15:21:08.903Z";
  EndDate: string = "2017-08-03T15:21:08.903Z";

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  submitProject() {
    const { Name, Description, CustomerName, StartDate, EndDate } = this;
    this.projectsService.postProject({ Name, Description, CustomerName, StartDate, EndDate, })
    .subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/admin/projects');
      }
    })
  }

}
