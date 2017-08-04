import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { AddProjectPageComponent } from './add-project-page.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'newproject',
    component: AddProjectPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    authRouting,
  ],
  declarations: [
    AddProjectPageComponent,
  ],
  exports: [
  ]
})
export class AddProjectModule { }
