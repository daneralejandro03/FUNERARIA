import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Deceased } from "src/app/models/deceased.model";
import { DeceasedService } from "src/app/services/deceased.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  deceaseds: Deceased[]; // This is the array that will store the theaters

  constructor(private service: DeceasedService, private router: Router) {
    this.deceaseds = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.deceaseds = data;
      console.log(JSON.stringify(this.deceaseds));
    });
  }

  create() {
    this.router.navigate(["deceaseds/create"]);
  }
}
