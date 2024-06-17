import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Role } from "src/app/models/role.model";
import { RoleService } from "src/app/services/role.service";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";
import { forkJoin, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  roles: Role[];

  constructor(private service: RoleService, private router: Router) {
    this.roles = [];
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.service.list().subscribe((data) => {
      this.roles = data;
      console.log(JSON.stringify(this.roles));
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
    this.router.navigate(["roles/create"]);
  }

  update(id: string) {
    console.log(id);
    this.router.navigate(["roles/update/" + id]);
  }

  view(id: string) {
    console.log(id);
    this.router.navigate(["roles/view/" + id]);
  }
}
