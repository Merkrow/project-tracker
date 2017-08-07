import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService, Task } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[];
  projectId: number;
  isSubmitting: boolean = false;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
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
  }

  transferDataSuccess1(event: any) {
    this.taskService.updateTask(Object.assign(event.dragData, { StatusId: 1 }))
    .subscribe(data => {
      this.tasks = this.tasks.map(item => {
        if (item.Id === data.Id) {
          return data;
        }
        return item;
      })
    })
  }
  transferDataSuccess2(event: any) {
    this.taskService.updateTask(Object.assign(event.dragData, { StatusId: 2 }))
    .subscribe(data => {
      this.tasks = this.tasks.map(item => {
        if (item.Id === data.Id) {
          return data;
        }
        return item;
      })
    })
  }
  transferDataSuccess3(event: any) {
    this.taskService.updateTask(Object.assign(event.dragData, { StatusId: 3 }))
    .subscribe(data => {
      this.tasks = this.tasks.map(item => {
        if (item.Id === data.Id) {
          return data;
        }
        return item;
      })
    })
  }
  transferDataSuccess4(event: any) {
    this.taskService.updateTask(Object.assign(event.dragData, { StatusId: 4 }))
    .subscribe(data => {
      this.tasks = this.tasks.map(item => {
        if (item.Id === data.Id) {
          return data;
        }
        return item;
      })
    })
  }
  transferDataSuccess5(event: any) {
    this.taskService.updateTask(Object.assign(event.dragData, { StatusId: 5 }))
    .subscribe(data => {
      this.tasks = this.tasks.map(item => {
        if (item.Id === data.Id) {
          return data;
        }
        return item;
      })
    })
  }

}
