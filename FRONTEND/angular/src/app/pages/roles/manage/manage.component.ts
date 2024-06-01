import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1 -> View, 2 -> Create, 3 -> Update
  role: Role;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {
    this.trySend = false;
    this.mode = 1;
    this.role = new Role();
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');

    if (this.route.snapshot.params.id) {
      this.role._id = this.route.snapshot.params.id;
      this.getRole(this.role._id);
    }

    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    if (this.mode === 2 || this.mode === 3) {
      this.getRole(this.role._id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getRole(id: string) {
    this.roleService.view(id).subscribe(data => {
      this.role = data;
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Formulario Incompleto", "Ingrese los datos solicitados", "error");
      return;
    }

    this.roleService.create(this.role).subscribe(data => {
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo rol", "success");
      this.router.navigate(["roles/list"]);
    });
  }

  update() {
    this.roleService.update(this.role._id, this.role).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el rol", "success");
      this.router.navigate(["roles/list"]);
    });
  }
}
