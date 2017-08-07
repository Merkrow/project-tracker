import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ListErrorsComponent } from './list-errors.component';
import { UserPickerComponent } from './layout/user-picker/user-picker.component';
import { TaskPickerComponent } from './layout/task-picker/task-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [
    ListErrorsComponent,
    UserPickerComponent,
    TaskPickerComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ListErrorsComponent,
    UserPickerComponent,
    TaskPickerComponent,
    RouterModule,
  ]
})
export class SharedModule {}
