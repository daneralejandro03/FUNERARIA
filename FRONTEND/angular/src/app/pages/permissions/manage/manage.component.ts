import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/models/permission.model';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class PermissionManageComponent implements OnInit {

  mode: number; // 1 -> View, 2 -> Create, 3 -> Update
  permission: Permission;
  permissionForm: FormGroup;
  trySend: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private permissionService: PermissionService
  ) {
    this.permission = new Permission();
    this.trySend = false;
    this.mode = 1;
    this.permissionForm = this.formBuilder.group({
      url: ['', Validators.required],
      method: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const urlSegments = this.route.snapshot.url.map(segment => segment.path);

    if (urlSegments.includes('create')) {
      this.mode = 2;
    } else if (urlSegments.includes('update')) {
      this.mode = 3;
      const id = this.route.snapshot.params.id;
      this.permissionService.view(id).subscribe(data => {
        this.permission = data;
        this.permissionForm.patchValue(data);
      });
    }
  }

  create() {
    if (this.permissionForm.invalid) {
      this.trySend = true;
      return;
    }
    this.permissionService.create(this.permissionForm.value).subscribe(() => {
      this.router.navigate(['/permissions']);
    });
  }

  update() {
    if (this.permissionForm.invalid) {
      this.trySend = true;
      return;
    }
    const id = this.route.snapshot.params.id;
    this.permissionService.update(id, this.permissionForm.value).subscribe(() => {
      this.router.navigate(['/permissions']);
    });
  }

}
