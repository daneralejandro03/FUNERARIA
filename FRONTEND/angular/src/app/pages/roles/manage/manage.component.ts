import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Role } from "src/app/models/role.model";
import { RoleService } from "src/app/services/role.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  role: Role;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: RoleService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.role = {
      _id: "",
      name: "",
      description: "",
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
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
    } else if (currentURL.includes("update")) {
      this.mode = 3;
    }

    if (this.activeRoute.snapshot.params.id) {
      this.role._id = this.activeRoute.snapshot.params.id;
      this.getRole(this.role._id);
    }
  }

  getRole(id: string) {
    this.service.view(id).subscribe((data) => {
      this.role = data;
      console.log("Permission -> " + JSON.stringify(this.role));
      // Llenar el formulario con los datos obtenidos del servidor
      this.theFormGroup.patchValue({
        name: this.role.name,
        description: this.role.description,
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
        this.router.navigate(["roles/list"]);
      },
      (error) => {
        console.error("Error creating role:", error);
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
    formData._id = this.role._id; // Asegurar que el _id se envíe para la actualización
    this.service.update(formData).subscribe(
      (data) => {
        Swal.fire(
          "Actualización exitosa",
          "Permiso actualizado correctamente",
          "success"
        );
        console.log("Permiso actualizado -> " + JSON.stringify(data));
        this.router.navigate(["roles/list"]);
      },
      (error) => {
        console.error("Error updating role:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al actualizar el permiso",
          "error"
        );
      }
    );
  }
}
