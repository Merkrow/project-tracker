import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService, Task, ProjectsService, Project } from '../shared';
import staticData from '../shared/staticData';

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
  staticData = staticData;
  ObjectKeys = Object.keys;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private projectService: ProjectsService,
  ) { }

  ngOnInit() {
    this.isSubmitting = true;
    this.route.params.subscribe(
      (params) => {
        this.projectId = Number(params.id);
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

  transferDataSuccess(data, key) {
    this.taskService.updateTask(Object.assign(data.dragData, { StatusId: Number(key) }))
    .subscribe(data => {
      this.tasks = this.tasks.map(item => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      })
    })
  }

}
