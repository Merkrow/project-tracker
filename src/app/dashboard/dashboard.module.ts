import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { DndModule } from 'ng2-dnd';

import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared';

const dashboardRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'dashboard/:id',
    component: DashboardComponent,
  }
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    DndModule.forRoot(),
    dashboardRouting,
  ],
  declarations: [
    DashboardComponent,
  ],
  exports: [
  ]
})
export class DashboardModule { }
