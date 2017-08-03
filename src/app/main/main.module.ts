import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { SharedModule } from '../shared';
import { ProjectComponent } from './project/project.component';
import { TaskRowComponent } from './task-row/task-row.component';
import { TaskCellComponent } from './task-cell/task-cell.component';
import { TimesheetPopup } from './task-cell/timesheet-popup/timesheet-popup.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'main',
    component: MainComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    authRouting,
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
