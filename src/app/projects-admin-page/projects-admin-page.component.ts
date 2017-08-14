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
  isSubmitting = false;
  filterName: string;
  editingId: any = null;
  edit: {
    Name: string,
    CustomerName: string,
    Description: string,
    StartDate: string,
  };
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
    });
  }

  setEdit(id) {
    this.editingId = Number(id);
    const { name, customerName, description, startDate } = this.allProjects.find(project => project.id === id);
    this.edit = { Name: name, CustomerName: customerName, Description: description, StartDate: moment(startDate).format('DD-MM-YYYY') };
  }

  closeEdit() {
    this.editingId = null;
    this.edit = { Name: '', CustomerName: '', Description: '', StartDate: ''};
  }

  submitChanges() {
    const project = this.allProjects.find(proj => proj.id === this.editingId);
    this.projectsService.updateProject(
      Object.assign(project, this.edit,
        { StartDate: moment(this.edit.StartDate, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ss')
      }))
    .subscribe(data => {
      this.allProjects = this.allProjects.map(proj => {
        if (proj.id === data.id) {
          return data;
        }
        return proj;
      });
      this.projects = this.allProjects;
    });
    this.closeEdit();
  }

  filterNameChange(val) {
    this.projects = this.allProjects.filter(project => project.name.toLowerCase().indexOf(val) !== -1);
  }

  deleteProject(Id) {
    this.projectsService.deleteProject(Id)
    .subscribe(data => {
      if (data) {
        this.allProjects = this.allProjects.filter(project => project.id !== data);
        this.projects = this.allProjects;
      }
    });
  }

}
