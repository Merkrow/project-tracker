import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DpDatePickerModule } from 'ng2-date-picker';

import { SharedModule } from '../shared';
import { AddTicketComponent } from './add-ticket.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'ticket/:id',
    component: AddTicketComponent,
  },
]);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DpDatePickerModule,
    authRouting,
  ],
  declarations: [
    AddTicketComponent,
  ],
  exports: [
  ]
})
export class AddTicketModule { }
