import { Component, OnInit, Input } from '@angular/core';

import { ProjectsService, Project } from '../../shared';

@Component({
  selector: 'app-user-projects-component',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css'],
})
export class UserProjectsComponent implements OnInit {
  projects: Project[];
  @Input() employeeId: number;

  constructor(
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.projectsService.getProjectsByUserId(this.employeeId)
    .subscribe(data => {
      this.projects = data;
    });
  }

}
