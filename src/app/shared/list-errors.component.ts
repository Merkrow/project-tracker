import { Component, Input } from '@angular/core';

import { Errors } from './models';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];
    if (errorList.errors) {
      for (const field in errorList.errors) {
        if (field !== 'errors') {
          this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
        }
      }
    }
  }

  get errorList() { return this.formattedErrors; }


}
