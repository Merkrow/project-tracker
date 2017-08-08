import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';

import { SharedModule } from '../shared';
import { TaskPageComponent } from './task-page.component';

const taskRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'tasks/:id',
    component: TaskPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DpDatePickerModule,
    taskRouting,
  ],
  declarations: [
    TaskPageComponent,
  ],
  exports: [
  ]
})
export class TaskPageModule { }
