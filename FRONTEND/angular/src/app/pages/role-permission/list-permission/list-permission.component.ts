import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Permission } from "src/app/models/permission.model";
import { RolePermissionService } from "src/app/services/role-permission.service";

@Component({
  selector: "app-list-permission",
  templateUrl: "./list-permission.component.html",
  styleUrls: ["./list-permission.component.scss"],
})
export class ListPermissionComponent implements OnInit {
  listPermissions: Permission[];
  roleId: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private rolePermissionService: RolePermissionService,
    private router: Router
  ) {
    this.listPermissions = [];
    this.roleId = "";
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.roleId = params.id;
      this.loadPermissions(this.roleId);
    });
  }

  loadPermissions(roleId: string): void {
    this.rolePermissionService
      .findByRole(roleId)
      .subscribe((rolePermissions) => {
        this.listPermissions = rolePermissions.map((rp) => rp.permission);
      });
  }
}
