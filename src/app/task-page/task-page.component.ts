import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

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
  staticData = staticData;
  save: boolean = true;
  editing: boolean = false;
  edit: {
    UserId: number;
    StatusId: number;
    TypeId: number;
    Estimate: number;
    StartDate: any;
    Description: string;
    EndDate: any;
  }
  moment = moment;

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
        this.edit = {
          UserId: data.ResponsibleId,
          StatusId: data.StatusId,
          TypeId: data.TypeId,
          Estimate: data.Estimate,
          StartDate: moment(data.StartDate),
          Description: data.Description,
          EndDate: moment(data.EndDate),
        };
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

  onChange() {
    this.save = false;
  }

  submitEdit() {
    const { UserId, StatusId, TypeId, Description, StartDate, Estimate, EndDate } = this.edit;
    if (!this.save) {
      this.taskService.updateTask(Object.assign(this.task,
        {
          ResponsibleId: UserId,
          StatusId,
          TypeId,
          Description,
          EndDate: EndDate.format("YYYY-MM-DDTHH:mm:ss"),
          StartDate: StartDate.format("YYYY-MM-DDTHH:mm:ss"),
          Estimate: Number(Estimate),
      }))
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

  chooseTaskId({ Id, type }) {
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
