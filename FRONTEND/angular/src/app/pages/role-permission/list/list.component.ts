import { Component, OnInit } from '@angular/core';
import { RolePermission } from 'src/app/models/role-permission.model';
import { RolePermissionService } from 'src/app/services/role-permission.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
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
