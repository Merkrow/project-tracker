import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  save: boolean = true;
  editing: boolean = false;
  edit: {
    UserId: number;
    StatusId: number;
    TypeId: number;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
        this.edit = { UserId: data.ResponsibleId, StatusId: data.StatusId, TypeId: data.TypeId };
        this.projectsService.getProject(this.task.ProjectId)
        .subscribe(data => {
          this.project = data;
          this.isSubmitting = false;
        })
      })
    }
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  submitEdit() {
    const { UserId, StatusId, TypeId } = this.edit;
    if (!this.save) {
      this.taskService.updateTask(Object.assign(this.task, { ResponsibleId: UserId, StatusId, TypeId }))
      .subscribe(data => {
        this.task = data;
      })
    }
    this.toggleEdit();
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.Id)
    .subscribe(data => {
      if (data === this.taskId) {
        this.router.navigateByUrl('/main');
      }
    })
  }

  chooseTaskId({ Id, type}) {
    switch (type) {
      case 'type':
        this.edit.TypeId = Id;
        this.save = false;
        return;
      case 'status':
        this.edit.StatusId = Id;
        this.save = false;
        return;
      default:
        return;
    }
  }

  chooseUser(Id) {
    this.edit.UserId = Number(Id);
    this.save = false;
  }

}
