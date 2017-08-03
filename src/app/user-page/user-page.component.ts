import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  employeeId: number;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.url.subscribe(
      (url) => {
        this.employeeId = Number(url[url.length - 1]);
      }
    )
  }

}
