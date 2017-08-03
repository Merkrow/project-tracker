import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService, Project } from '../shared';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  projectId: number;
  project: Project;
  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(
      (url) => {
        this.projectId = Number(url[url.length - 1]);
      }
    )
    if (this.projectId) {
      this.projectsService.getProject(this.projectId)
      .subscribe(data => {
        this.project = data;
      });
    }
  }

}
