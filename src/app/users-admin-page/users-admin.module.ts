import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { UsersAdminPageComponent } from './users-admin-page.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin/users',
    component: UsersAdminPageComponent,
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
    UsersAdminPageComponent,
  ],
  exports: [
  ]
})
export class UsersAdminPageModule { }
