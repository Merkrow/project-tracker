import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import util from '../util';
import { UserService, ProjectsService } from '../shared';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    private userService: UserService,
  ) { }
  loading = false;
  projects: {}[];
  isAuthenticated: boolean;
  firstDay: any;
  interval: any[] = [];

  setInterval() {
    this.interval = new Array(6);
    for (let i = 0; i <= 5; i++) {
      this.interval[i] = moment(this.firstDay).add(i, 'days');
    }
  }

  nextDay() {
    this.firstDay = this.firstDay.add(1, 'days');
    this.setInterval();
  }

  prevDay() {
    this.firstDay = this.firstDay.subtract(1, 'day');
    this.setInterval();
  }

  prepareProject(project) {
    const startDate = moment(util.getDate(project.StartDate));
    const endDate = moment(util.getDate(project.EndDate));
    if (moment().isBetween(startDate, endDate)) {
      return Object.assign(project, { active: true });
    }
    return Object.assign(project, { active: false });
  }

  ngOnInit() {
    this.loading = true;
    this.firstDay = moment().subtract(5, 'day');
    this.userService.isAuthenticated
    .subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        if (authenticated) {
          this.userService.isAdmin.subscribe(
            (isAdmin) => {
              if (isAdmin) {
                this.projectsService.get()
                .subscribe(data => {
                  this.loading = false;
                  this.projects = data.map(this.prepareProject);
                });
              } else {
                this.userService.currentUser.subscribe(
                  (user) => {
                    if (user.Id) {
                      this.projectsService.getProjectsByUserId(user.Id)
                      .subscribe(data => {
                        this.projects = data.map(this.prepareProject);
                      })
                    }
                  }
                )
              }
            }
          )
          return;
        } else {
          this.router.navigateByUrl('/login');
        }
      }
    );
    this.setInterval();
  }

}
