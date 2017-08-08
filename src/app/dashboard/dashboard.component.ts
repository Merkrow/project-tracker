import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService, Task, ProjectsService, Project } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[];
  projectId: number;
  isSubmitting: boolean = false;
  project: Project;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
  ) { }

  ngOnInit() {
    this.isSubmitting = true;
    this.route.url.subscribe(
      (url) => {
        this.projectId = Number(url[url.length - 1]);
      }
    )

    this.taskService.getTaskByProjectId(this.projectId)
    .subscribe(data => {
      this.tasks = data;
      this.isSubmitting = false;
    })

    this.projectService.getProject(this.projectId)
    .subscribe(data => {
      this.project = data;
    })
  }

  updateData(data, StatusId) {
    this.taskService.updateTask(Object.assign(data, { StatusId }))
    .subscribe(data => {
      this.tasks = this.tasks.map(item => {
        if (item.Id === data.Id) {
          return data;
        }
        return item;
      })
    })
  }

  transferDataSuccess1(event: any) {
    this.updateData(event.dragData, 1);
  }

  transferDataSuccess2(event: any) {
    this.updateData(event.dragData, 2);
  }
  transferDataSuccess3(event: any) {
    this.updateData(event.dragData, 3);
  }
  transferDataSuccess4(event: any) {
    this.updateData(event.dragData, 4);
  }
  transferDataSuccess5(event: any) {
    this.updateData(event.dragData, 5);
  }

}
