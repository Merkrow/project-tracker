import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { TaskService, Task, ProjectsService, Project } from '../shared';
import staticData from '../shared/staticData';

@Component({
  selector: 'app-task-page-component',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {
  taskId: number;
  task: Task;
  isSubmitting = false;
  project: Project;
  staticData = staticData;
  save = true;
  editing = false;
  edit: {
    UserId: number;
    StatusId: number;
    TypeId: number;
    Estimate: number;
    StartDate: any;
    Description: string;
    EndDate: any;
  };
  moment = moment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.taskId = Number(params.id);
      }
    );
    if (this.taskId) {
      this.isSubmitting = true;
      this.taskService.getTaskById(this.taskId)
      .subscribe(data => {
        this.task = data;
        this.edit = {
          UserId: data.responsibleId,
          StatusId: data.statusId,
          TypeId: data.typeId,
          Estimate: data.estimate,
          StartDate: moment(data.startDate),
          Description: data.description,
          EndDate: moment(data.endDate),
        };
        this.projectsService.getProject(this.task.projectId)
        .subscribe(project => {
          this.project = project;
          this.isSubmitting = false;
        });
      });
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
          EndDate: EndDate.format('YYYY-MM-DDTHH:mm:ss'),
          StartDate: StartDate.format('YYYY-MM-DDTHH:mm:ss'),
          Estimate: Number(Estimate),
      }))
      .subscribe(data => {
        this.task = data;
      });
    }
    this.toggleEdit();
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id)
    .subscribe(data => {
      if (data === this.task.id) {
        this.router.navigateByUrl('/main');
      }
    });
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

  chooseUser(id) {
    this.edit.UserId = Number(id);
    this.save = false;
  }

}
