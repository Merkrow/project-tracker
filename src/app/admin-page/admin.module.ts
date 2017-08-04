import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { AdminPageComponent } from './admin-page.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    authRouting,
  ],
  declarations: [
    AdminPageComponent,
  ],
  exports: [
  ]
})
export class AdminPageModule { }
