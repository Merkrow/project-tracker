import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService, Task, ProjectsService, Project } from '../shared';
import staticData from '../shared/staticData';

@Component({
  selector: 'task-page-component',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  taskId: number;
  task: Task;
  isSubmitting: boolean = false;
  project: Project;
  staticData: {} = staticData;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(
      (url) => {
        this.taskId = Number(url[url.length - 1]);
      }
    )
    if (this.taskId) {
      this.isSubmitting = true;
      this.taskService.getTaskById(this.taskId)
      .subscribe(data => {
        this.task = data;
        this.projectsService.getProject(this.task.ProjectId)
        .subscribe(data => {
          this.project = data;
          this.isSubmitting = false;
        })
      })
    }
  }

}
