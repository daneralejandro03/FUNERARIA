import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/models/permission.model';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class PermissionListComponent implements OnInit {

  permissions: Permission[];

  constructor(private permissionService: PermissionService) {
    this.permissions = [];
  }

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions() {
    this.permissionService.list().subscribe(data => {
      this.permissions = data;
    });
  }

  deletePermission(id: string) {
    this.permissionService.delete(id).subscribe(() => {
      this.loadPermissions();
    });
  }

}
