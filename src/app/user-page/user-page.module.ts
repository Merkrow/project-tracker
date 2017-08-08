import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { UserPageComponent } from './user-page.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserSkillsComponent } from './user-skills/user-skills.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { SkillComponent } from './user-skills/skill/skill.component';
import { UserTasksComponent } from './user-projects/user-tasks/user-tasks.component';

const userRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'users/:id',
    component: UserPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    userRouting,
  ],
  declarations: [
    UserPageComponent,
    UserInfoComponent,
    UserSkillsComponent,
    UserProjectsComponent,
    SkillComponent,
    UserTasksComponent,
  ],
  exports: [
  ]
})
export class UserPageModule { }
