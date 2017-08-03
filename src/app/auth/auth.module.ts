import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'register',
    component: AuthComponent,
  }
]);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    authRouting,
  ],
  declarations: [
    AuthComponent,
  ],
  exports: [
  ]
})
export class AuthModule { }
