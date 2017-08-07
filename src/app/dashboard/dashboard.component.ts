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

}
