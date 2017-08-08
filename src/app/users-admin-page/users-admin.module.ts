import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { UsersAdminPageComponent } from './users-admin-page.component';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin/users',
    component: UsersAdminPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    adminRouting,
  ],
  declarations: [
    UsersAdminPageComponent,
  ],
  exports: [
  ]
})
export class UsersAdminPageModule { }
