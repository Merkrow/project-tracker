import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';

import { SharedModule } from '../shared';
import { AddProjectPageComponent } from './add-project-page.component';

const projectRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'newproject',
    component: AddProjectPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DpDatePickerModule,
    projectRouting,
  ],
  declarations: [
    AddProjectPageComponent,
  ],
  exports: [
  ]
})
export class AddProjectModule { }
