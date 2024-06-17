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
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    const id = this.activateRoute.snapshot.params.id;
    console.log("Current URL: ", currentUrl);
    console.log("ID: ", id);

    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    }

    if (id && this.mode === 1) {
      this.getRoleIdFromRolePermission(id);
    }

    this.theFormGroup = this.formBuilder.group({
      idRole: ["", [Validators.required]],
      idPermission: ["", [Validators.required]],
    });

    this.loadRoles();
    this.loadPermissions();
  }

  loadRoles() {
    this.roleService.list().subscribe((data) => {
      this.roles = data;
      console.log("Roles: ", JSON.stringify(this.roles));
    });
  }

  loadPermissions() {
    this.permissionService.list().subscribe((data) => {
      this.permissions = data;
      console.log("Permissions: ", JSON.stringify(this.permissions));
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getRoleIdFromRolePermission(rolePermissionId: string) {
    this.rolePermissionService
      .findByRole(rolePermissionId)
      .subscribe((data) => {
        if (data && data.length > 0) {
          const roleId = data[0].role._id; // Obtenemos el id del rol desde el rolpermiso
          this.getRolePermission(roleId);
        }
      });
  }

  getRolePermission(roleId: string) {
    this.rolePermissionService.findByRole(roleId).subscribe((data) => {
      if (data && data.length > 0) {
        this.rolePermission = data[0];
        this.theFormGroup.patchValue({
          idRole: this.rolePermission.role._id,
          idPermission: this.rolePermission.permission._id,
        });
      }
    });
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
}
