import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ProjectsService, Project } from '../shared';

@Component({
  selector: 'app-projects-admin-page',
  templateUrl: './projects-admin-page.component.html',
  styleUrls: ['./projects-admin-page.component.css']
})
export class ProjectsAdminPageComponent implements OnInit {
  projects: Project[];
  allProjects: Project[];
  isSubmitting: boolean = false;
  filterName: string;
  editingId: any = null;
  edit: {
    Name: string,
    CustomerName: string,
    Description: string,
    StartDate: string,
  }
  moment = moment;

  constructor(
    private projectsService: ProjectsService,
  ) { }

  ngOnInit() {
    this.isSubmitting = true;
    this.projectsService.get()
    .subscribe(data => {
      this.allProjects = data;
      this.projects = data;
      this.isSubmitting = false;
    })
  }

  setEdit(Id) {
    this.editingId = Number(Id);
    const { Name, CustomerName, Description, StartDate } = this.allProjects.find(project => project.Id === Id);
    this.edit = { Name, CustomerName, Description, StartDate: moment(StartDate).format('DD-MM-YYYY') };
  }

  closeEdit() {
    this.editingId = null;
    this.edit = { Name: '', CustomerName: '', Description: '', StartDate: ''};
  }

  submitChanges() {
    const project = this.allProjects.find(project => project.Id === this.editingId);
    this.projectsService.updateProject(Object.assign(project, this.edit, { StartDate: moment(this.edit.StartDate, 'DD-MM-YYYY').format("YYYY-MM-DDTHH:mm:ss") }))
    .subscribe(data => {
      this.allProjects = this.allProjects.map(project => {
        if (project.Id === data.Id) {
          return data;
        }
        return project;
      });
      this.projects = this.allProjects;
    })
    this.closeEdit();
  }

  filterNameChange(val) {
    this.projects = this.allProjects.filter(project => project.Name.toLowerCase().indexOf(val) !== -1);
  }

  deleteProject(Id) {
    this.projectsService.deleteProject(Id)
    .subscribe(data => {
      if (data) {
        this.allProjects = this.allProjects.filter(project => project.Id !== data);
        this.projects = this.allProjects;
      }
    })
  }

}
