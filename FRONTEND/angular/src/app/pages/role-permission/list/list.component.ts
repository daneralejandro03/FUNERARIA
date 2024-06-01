import { Component, OnInit } from '@angular/core';
import { RolePermission } from 'src/app/models/role-permission.model';
import { RolePermissionService } from 'src/app/services/role-permission.service';

@Component({
  selector: 'app-role-permission-list',
  templateUrl: './role-permission-list.component.html',
  styleUrls: ['./role-permission-list.component.scss']
})
export class RolePermissionListComponent implements OnInit {
  rolePermissions: RolePermission[];

  constructor(private rolePermissionService: RolePermissionService) {
    this.rolePermissions = [];
  }

  ngOnInit(): void {
    this.loadRolePermissions();
  }

  loadRolePermissions() {
    this.rolePermissionService.findAll().subscribe(data => {
      this.rolePermissions = data;
    });
  }

  deleteRolePermission(id: string) {
    this.rolePermissionService.delete(id).subscribe(() => {
      this.loadRolePermissions();
    });
  }
}
