import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { TaskPageComponent } from './task-page.component';


const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'tasks/:id',
    component: TaskPageComponent,
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
    TaskPageComponent,
  ],
  exports: [
  ]
})
export class TaskPageModule { }
