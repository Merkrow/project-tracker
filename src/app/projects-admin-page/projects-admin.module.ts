import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    authRouting,
  ],
  declarations: [
    ProjectsAdminPageComponent,
  ],
  exports: [
  ]
})
export class ProjectsAdminPageModule { }
