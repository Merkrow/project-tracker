import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { ProjectPageComponent } from './project-page.component';
import { TeamComponent } from './team/team.component';
import { TeamMemberComponent } from './team-member/team-member.component';

const projectRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'projects/:id',
    component: ProjectPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    projectRouting,
  ],
  declarations: [
    ProjectPageComponent,
    TeamComponent,
    TeamMemberComponent,
  ],
  exports: [
  ]
})
export class ProjectPageModule { }
