import { Component, Input } from '@angular/core';

import { TaskService, TimesheetService, Project, Task } from '../../shared';

@Component({
  selector: 'project-component',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  tasks: Task[];
  constructor (
    private taskService: TaskService,
    private timesheetService: TimesheetService,
  ) {}

  ngOnInit() {
    this.taskService.getTaskByProjectId(this.project.Id)
    .subscribe(data => {
      this.tasks = data;
    })
  }

  @Input() project: Project;
  @Input() interval: any[];
  @Input() emplId: number;

}
