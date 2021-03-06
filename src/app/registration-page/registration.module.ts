import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';

import { SharedModule } from '../shared';
import { RegistrationPageComponent } from './registration-page.component';

const registrationRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'registration',
    component: RegistrationPageComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DpDatePickerModule,
    registrationRouting,
  ],
  declarations: [
    RegistrationPageComponent,
  ],
  exports: [
  ]
})
export class RegistrationModule { }
