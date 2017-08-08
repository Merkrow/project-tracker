import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';

import { SharedModule } from '../shared';
import { ProjectsAdminPageComponent } from './projects-admin-page.component';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin/projects',
    component: ProjectsAdminPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DpDatePickerModule,
    adminRouting,
  ],
  declarations: [
    ProjectsAdminPageComponent,
  ],
  exports: [
  ]
})
export class ProjectsAdminPageModule { }
