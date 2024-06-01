import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { Permission } from 'src/app/models/permission.model';
import { RolePermission } from 'src/app/models/role-permission.model';
import { RolePermissionService } from 'src/app/services/role-permission.service';
import { RoleService } from 'src/app/services/role.service';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> View, 2 -> Create, 3 -> Update
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
    private theFormBuilder: FormBuilder
  ) {
    this.roles = [];
    this.permissions = [];
    this.trySend = false;
    this.mode = 1;
    this.rolePermission = {
      _id: '',
      role: { _id: '', name: '', description: '' },
      permission: { _id: '', url: '', method: '' }
    };
    this.configFormGroup();
    this.loadRoles();
    this.loadPermissions();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    const id = this.activateRoute.snapshot.params.id;

    if (id) {
      this.rolePermission._id = id;
      this.getRolePermission(this.rolePermission._id);
    }

    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
  }

  loadRoles() {
    this.roleService.list().subscribe(data => {
      this.roles = data;
    });
  }

  loadPermissions() {
    this.permissionService.list().subscribe(data => {
      this.permissions = data;
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      role: [null, [Validators.required]],
      permission: [null, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getRolePermission(id: string) {
    this.rolePermissionService.findByRole(id).subscribe(data => {
      this.rolePermission = data[0];
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario Incompleto', 'Ingrese los datos solicitados', 'error');
      return;
    }
    this.rolePermissionService.create(this.getTheFormGroup.role.value, this.getTheFormGroup.permission.value).subscribe(data => {
      Swal.fire('Creación Exitosa', 'Se ha creado una nueva asignación', 'success');
      this.router.navigate(['role-permission/list']);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Formulario Incompleto', 'Ingrese los datos solicitados', 'error');
      return;
    }
    this.rolePermissionService.create(this.getTheFormGroup.role.value, this.getTheFormGroup.permission.value).subscribe(data => {
      Swal.fire('Actualización Exitosa', 'Se ha actualizado la asignación', 'success');
      this.router.navigate(['role-permission/list']);
    });
  }
}
