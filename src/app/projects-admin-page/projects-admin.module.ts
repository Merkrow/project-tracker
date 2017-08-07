import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';

import { SharedModule } from '../shared';
import { ProjectsAdminPageComponent } from './projects-admin-page.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin/projects',
    component: ProjectsAdminPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DpDatePickerModule,
    authRouting,
  ],
  declarations: [
    ProjectsAdminPageComponent,
  ],
  exports: [
  ]
})
export class ProjectsAdminPageModule { }
