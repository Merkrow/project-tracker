import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { ProjectPageModule } from './project-page/project-page.module';
import { UserPageModule } from './user-page/user-page.module';
import {
  ApiService,
  SharedModule,
  UserService,
  HeaderComponent,
  LocalStorageService,
  ProjectsService,
  TaskService,
  TimesheetService,
  SkillsService,
  TeamService,
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
    AuthModule,
    SharedModule,
    ProjectPageModule,
    UserPageModule,
    rootRouting,
  ],
  providers: [
    ApiService,
    UserService,
    LocalStorageService,
    ProjectsService,
    TaskService,
    TimesheetService,
    SkillsService,
    TeamService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
