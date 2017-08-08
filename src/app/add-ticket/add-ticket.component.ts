import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { TaskService } from '../shared';
import staticData from '../shared/staticData';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  ticketForm: FormGroup;
  StartDate: string = moment().format('DD-MM-YYYY');
  EndDate: string = moment().format('DD-MM-YYYY');
  StatusId: number = 1;
  projectId: number;
  TypeId: number = 1;
  ResponsibleId: number;
  ReporterId: number;
  staticData = staticData;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.ticketForm = this.fb.group({
      'Name': ['', Validators.required],
      'Description': ['', Validators.required],
      'Estimate': ['', Validators.required],
    })
  }

  chooseStatusId(statusId) {
    this.StatusId = Number(statusId.Id);
  }

  chooseTypeId(typeId) {
    this.TypeId = Number(typeId.Id);
  }

  chooseResponsible(Id) {
    this.ResponsibleId = Number(Id);
  }

  chooseReporter(Id) {
    this.ReporterId = Number(Id);
  }

  submitTicket() {
    const { StartDate, EndDate, StatusId, TypeId, ResponsibleId, ReporterId } = this;
    this.taskService.postTask(Object.assign(this.ticketForm.value,
      {
        StartDate: moment(StartDate, 'DD-MM-YYYY').format("YYYY-MM-DDTHH:mm:ss"),
        EndDate: moment(EndDate, 'DD-MM-YYYY').format("YYYY-MM-DDTHH:mm:ss"),
        StatusId,
        TypeId,
        ResponsibleId,
        ReporterId,
        ProjectId: this.projectId,
      })).subscribe(data => {
        if(data) {
          this.router.navigateByUrl(`/projects/${this.projectId}`);
        }
      })
  }

  ngOnInit() {
    this.route.url.subscribe(
      (url) => {
        this.projectId = Number(url[url.length - 1]);
      }
    )
  }

}
