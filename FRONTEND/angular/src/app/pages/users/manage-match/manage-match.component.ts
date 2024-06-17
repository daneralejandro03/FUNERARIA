import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Role } from "src/app/models/role.model";
import { UserService } from "src/app/services/user.service";
import { RoleService } from "src/app/services/role.service";
import Swal from "sweetalert2";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-manage-match",
  templateUrl: "./manage-match.component.html",
  styleUrls: ["./manage-match.component.scss"],
})
export class ManageMatchComponent implements OnInit {
  user: User;
  roles: Role[];
  selectedRoleId: string;
  userId: string;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = {
      _id: "",
      name: "",
      email: "",
      identificationCard: "",
      password: "",
      role: {
        _id: "",
        name: "",
        description: "",
      },
    };
    this.roles = [];
    this.selectedRoleId = "";
    this.userId = "";
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params["id"];
      this.loadUserAndRoles(this.userId);
      this.listRoles();
    });
  }

  loadUserAndRoles(userId: string) {
    this.userService.view(userId).subscribe((user) => {
      this.user = user;
      this.selectedRoleId = user.role ? user.role._id : ""; // Asigna el ID del rol actual si existe
    });
  }

  listRoles() {
    this.roleService.list().subscribe((data) => {
      this.roles = data;
    });
  }

  assignRole() {
    if (this.selectedRoleId === this.user.role?._id) {
      // No se realizan cambios si el rol seleccionado es igual al rol actual
      Swal.fire(
        "Sin cambios",
        "El usuario ya tiene asignado este rol.",
        "info"
      );
      return;
    }

    // Desasignar el rol actual, si existe
    if (this.user.role?._id) {
      this.userService
        .unmatchRole(this.userId, this.user.role._id)
        .subscribe(() => {
          console.log("Rol desasignado correctamente.");
          this.user.role = null; // Limpiar el rol actual del usuario
        });
    }

    // Asignar el nuevo rol seleccionado, si se ha seleccionado uno
    if (this.selectedRoleId) {
      this.userService
        .matchRole(this.userId, this.selectedRoleId)
        .subscribe(() => {
          console.log("Rol asignado correctamente.");
          // Cargar de nuevo los roles del usuario después de asignar el nuevo rol
          this.loadUserAndRoles(this.userId);
          Swal.fire(
            "Rol asignado",
            "El rol ha sido asignado correctamente al usuario.",
            "success"
          );
        });
    } else {
      // Si no se seleccionó ningún rol, actualizamos solo la vista del usuario
      this.userService.view(this.userId).subscribe((user) => {
        this.user = user;
        Swal.fire(
          "Roles actualizados",
          "El usuario ha sido actualizado correctamente.",
          "success"
        );
      });
    }
  }

  removeRole() {
    if (!this.user.role?._id) {
      Swal.fire(
        "Sin rol",
        "El usuario no tiene un rol asignado para eliminar.",
        "info"
      );
      return;
    }

    this.userService
      .unmatchRole(this.userId, this.user.role._id)
      .subscribe(() => {
        console.log("Rol eliminado correctamente.");
        // Limpiar el rol del usuario y recargar los datos del usuario
        this.user.role = null;
        this.loadUserAndRoles(this.userId);
        Swal.fire(
          "Rol eliminado",
          "El rol ha sido eliminado correctamente del usuario.",
          "success"
        );
      });
  }

  goBack() {
    this.router.navigate(["/users/list"]);
  }
}
