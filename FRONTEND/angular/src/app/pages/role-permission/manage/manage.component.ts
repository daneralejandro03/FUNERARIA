import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Role } from "src/app/models/role.model";
import { Permission } from "src/app/models/permission.model";
import { RolePermission } from "src/app/models/role-permission.model";
import { RolePermissionService } from "src/app/services/role-permission.service";
import { RoleService } from "src/app/services/role.service";
import { PermissionService } from "src/app/services/permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View, 2 -> Create
  rolePermission: RolePermission;
  roles: Role[];
  permissions: Permission[];
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private rolePermissionService: RolePermissionService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.roles = [];
    this.permissions = [];
    this.trySend = false;
    this.mode = 1; // Por defecto en modo de visualización
    this.rolePermission = {
      _id: "",
      idRole: "",
      idPermission: "",
      role: {
        _id: "",
        name: "",
        description: "",
      },
      permission: {
        _id: "",
        url: "",
        method: "",
      },
    };
  }

  ngOnInit(): void {
    const currentURL = this.activateRoute.snapshot.url.join("/");

    if (currentURL.includes("view")) {
      this.mode = 1;
    } else if (currentURL.includes("create")) {
      this.mode = 2;
    } else if (currentURL.includes("update")) {
      this.mode = 3;
    }

    this.configFormGroup();

    this.loadRoles();
    this.loadPermissions();

    if (this.activateRoute.snapshot.params.id) {
      this.rolePermission._id = this.activateRoute.snapshot.params.id;
      this.getRolePermission(this.rolePermission._id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.formBuilder.group({
      idRole: ["", [Validators.required]],
      idPermission: ["", [Validators.required]],
    });
  }

  loadRoles() {
    this.roleService.list().subscribe((data) => {
      this.roles = data;
      console.log("Roles: ", JSON.stringify(this.roles));
      this.setRolePermission();
    });
  }

  loadPermissions() {
    this.permissionService.list().subscribe((data) => {
      this.permissions = data;
      console.log("Permissions: ", JSON.stringify(this.permissions));
      this.setRolePermission();
    });
  }

  getRolePermission(id: string) {
    this.rolePermissionService.view(id).subscribe((data) => {
      this.rolePermission = data;
      console.log("RolePermission -> " + JSON.stringify(this.rolePermission));
      // Llenar el formulario con los datos obtenidos del servidor
      this.setRolePermission();
    });
  }

  setRolePermission() {
    if (
      this.roles.length > 0 &&
      this.permissions.length > 0 &&
      this.rolePermission._id
    ) {
      this.theFormGroup.patchValue({
        idRole: this.rolePermission.role._id,
        idPermission: this.rolePermission.permission._id,
      });
    }
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario Incompleto",
        "Ingrese los datos solicitados",
        "error"
      );
      return;
    }
    const roleId = this.getTheFormGroup.idRole.value;
    const permissionId = this.getTheFormGroup.idPermission.value;
    this.rolePermissionService
      .create(roleId, permissionId)
      .subscribe((data) => {
        Swal.fire(
          "Creación Exitosa",
          "Se ha creado una nueva asignación",
          "success"
        );
        this.router.navigate(["rolepermissions/list"]);
      });
  }

  cancel() {
    this.router.navigate(["rolepermissions/list"]);
  }
}
