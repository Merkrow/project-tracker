import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { SharedModule } from '../shared';
import { ProjectComponent } from './project/project.component';
import { TaskRowComponent } from './task-row/task-row.component';
import { TaskCellComponent } from './task-cell/task-cell.component';
import { TimesheetPopup } from './task-cell/timesheet-popup/timesheet-popup.component';

const mainRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'main',
    component: MainComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    mainRouting,
  ],
  declarations: [
    MainComponent,
    ProjectComponent,
    TaskRowComponent,
    TaskCellComponent,
    TimesheetPopup,
  ],
  exports: [
  ]
})
export class MainModule { }
