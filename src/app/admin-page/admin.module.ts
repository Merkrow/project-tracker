import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule, AdminGuard, PmGuard } from '../shared';
import { AdminPageComponent } from './admin-page.component';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AdminGuard],
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    adminRouting,
  ],
  declarations: [
    AdminPageComponent,
  ],
  exports: [
  ]
})
export class AdminPageModule { }
