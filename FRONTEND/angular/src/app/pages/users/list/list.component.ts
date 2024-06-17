import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  users: User[];

  constructor(private service: UserService, private router: Router) {
    this.users = [];
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.service.list().subscribe((data) => {
      this.users = data;
      console.log(JSON.stringify(this.users));
    });
  }

  view(id: string) {
    console.log("Navigating to view for user id: " + id);
    this.router.navigate(["users/view/" + id]);
  }

  navigateToRoles(id: string) {
    console.log("Navigating to roles for user id: " + id);
    this.router.navigate(["users/assign/" + id]); // Cambiado a 'assign'
    console.log("Navigating to roles for user id: " + id);
  }
}
