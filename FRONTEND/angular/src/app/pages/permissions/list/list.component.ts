import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Permission } from "src/app/models/permission.model";
import { PermissionService } from "src/app/services/permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class PermissionListComponent implements OnInit {
  permissions: Permission[];

  constructor(private service: PermissionService, private router: Router) {
    this.permissions = [];
  }

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions() {
    this.service.list().subscribe((data) => {
      this.permissions = data;
      console.log(JSON.stringify(this.permissions));
    });
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
    this.router.navigate(["permissions/create"]);
  }

  update(id: string) {
    console.log(id);
    this.router.navigate(["permissions/update/" + id]);
  }

  view(id: string) {
    console.log(id);
    this.router.navigate(["permissions/view/" + id]);
  }
}
