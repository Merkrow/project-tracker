import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { UserPageComponent } from './user-page.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserSkillsComponent } from './user-skills/user-skills.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';


const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'users/:id',
    component: UserPageComponent,
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
    UserPageComponent,
    UserInfoComponent,
    UserSkillsComponent,
    UserProjectsComponent,
  ],
  exports: [
  ]
})
export class UserPageModule { }
