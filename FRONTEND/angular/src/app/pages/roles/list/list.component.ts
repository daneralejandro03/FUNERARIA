import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  roles: Role[];

  constructor(private roleService: RoleService, private router: Router) {
    this.roles = [];
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.list().subscribe(roles => {
      this.roles = roles;
    });
  }

  view(id: string) {
    this.router.navigate(["roles/view", id]);
  }

  delete(id: string) {
    this.roleService.delete(id).subscribe(() => {
      this.loadRoles();
    });
  }
}
