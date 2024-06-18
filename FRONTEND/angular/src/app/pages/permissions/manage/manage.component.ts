import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Permission } from "src/app/models/permission.model";
import { PermissionService } from "src/app/services/permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class PermissionManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  permission: Permission;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: PermissionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.permission = {
      _id: "",
      url: "",
      method: "",
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.formBuilder.group({
      url: ["", [Validators.required]],
      method: ["", [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    const currentURL = this.activeRoute.snapshot.url.join("/");

    if (currentURL.includes("view")) {
      this.mode = 1;
    } else if (currentURL.includes("create")) {
      this.mode = 2;
    }

    if (this.activeRoute.snapshot.params.id) {
      this.permission._id = this.activeRoute.snapshot.params.id;
      this.getPermission(this.permission._id);
    }
  }

  getPermission(id: string) {
    this.service.view(id).subscribe((data) => {
      this.permission = data;
      console.log("Permission -> " + JSON.stringify(this.permission));
      // Llenar el formulario con los datos obtenidos del servidor
      this.theFormGroup.patchValue({
        url: this.permission.url,
        method: this.permission.method,
      });
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor, complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }
    // Obtener los datos del formulario y enviarlos al servicio para crear
    const formData = this.theFormGroup.value;
    this.service.create(formData).subscribe(
      (data) => {
        Swal.fire(
          "Creación exitosa",
          "Permiso creado correctamente",
          "success"
        );
        console.log("Permiso creado -> " + JSON.stringify(data));
        this.router.navigate(["permissions/list"]);
      },
      (error) => {
        console.error("Error creating permission:", error);
        Swal.fire("Error", "Hubo un problema al crear el permiso", "error");
      }
    );
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor, complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }
    // Obtener los datos del formulario y enviarlos al servicio para actualizar
    const formData = this.theFormGroup.value;
    formData._id = this.permission._id; // Asegurar que el _id se envíe para la actualización
    this.service.update(formData).subscribe(
      (data) => {
        Swal.fire(
          "Actualización exitosa",
          "Permiso actualizado correctamente",
          "success"
        );
        console.log("Permiso actualizado -> " + JSON.stringify(data));
        this.router.navigate(["permissions/list"]);
      },
      (error) => {
        console.error("Error updating permission:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al actualizar el permiso",
          "error"
        );
      }
    );
  }
}
