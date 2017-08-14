import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { ProjectsService, Project } from '../shared';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  projectId: number;
  project: Project;
  isSubmitting = false;
  moment = moment;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.isSubmitting = true;
    this.route.params.subscribe(
      (params) => {
        this.projectId = Number(params.id);
      }
    );
    if (this.projectId) {
      this.projectsService.getProject(this.projectId)
      .subscribe(data => {
        this.project = data;
        this.isSubmitting = false;
      });
    }
  }

}
