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
    if (!this.emplId) {
      this.taskService.getTaskByProjectId(this.project.id)
      .subscribe(data => {
        this.tasks = data;
      })
    } else {
      this.taskService.searchTask({ ['taskSearch.responsibleId']: this.emplId, ['taskSearch.projectId']: this.project.id })
      .subscribe(data => {
        this.tasks = data;
      })
    }
  }

  @Input() project: Project;
  @Input() interval: any[];
  @Input() emplId: number;

}
