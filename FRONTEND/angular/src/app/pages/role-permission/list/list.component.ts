import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RolePermission } from "src/app/models/role-permission.model";
import { RolePermissionService } from "src/app/services/role-permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  rolePermissions: RolePermission[];

  constructor(private service: RolePermissionService, private router: Router) {
    this.rolePermissions = [];
  }

  ngOnInit(): void {
    this.loadRolePermissions();
  }

  loadRolePermissions() {
    this.service.findAll().subscribe(
      (data: RolePermission[]) => {
        this.rolePermissions = data;
      },
      (error) => {
        console.error("Error fetching role permissions", error);
      }
    );
  }

  delete(id: string): void {
    console.log(id);
    Swal.fire({
      title: "Eliminar",
      text: "Está seguro que quiere eliminar el sitio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El registro se ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }

  create() {
    this.router.navigate(["rolepermissions/create"]);
  }

  view(id: string) {
    console.log(id);
    this.router.navigate(["rolepermissions/view/" + id]);
  }
}
