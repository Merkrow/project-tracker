import { Component, OnInit, Input } from '@angular/core';

import { TaskService, Task } from '../../../shared';

@Component({
  selector: 'user-tasks-component',
  templateUrl: './user-tasks.component.html',
})
export class UserTasksComponent implements OnInit {
  tasks: Task[];
  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit() {
    this.taskService.getTaskByProjectId(this.projectId)
    .subscribe(data => {
      this.tasks = data.filter(task => task.ResponsibleId === this.employeeId);
    })
  }

  @Input() projectId: number;
  @Input() employeeId: number;
}
