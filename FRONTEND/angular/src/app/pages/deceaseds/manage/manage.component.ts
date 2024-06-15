import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cause } from "src/app/models/cause.model";
import { Deceased } from "src/app/models/deceased.model";
import { DeceasedService } from "src/app/services/deceased.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  deceased: Deceased;
  theFormGroup: FormGroup;
  trySend: boolean;
  causas: Cause[];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: DeceasedService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.deceased = {
      id: 0,
      nombre: "",
      fecha: null,
      causa: { id: 0, nombre: "" },
    };
    this.causas = [];
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      nombre: ["", [Validators.required]],
      fecha: ["", [Validators.required]],
      causa: ["", [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("create")) {
      this.mode = 2; // Modo Crear
    }

    this.service.listCause().subscribe((data) => {
      this.causas = data;
      console.log(this.causas);
    });
  }

  create(): void {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      const newDeceased: Deceased = {
        id: this.deceased.id,
        nombre: this.theFormGroup.get("nombre")?.value,
        fecha: new Date(this.theFormGroup.get("fecha")?.value),
        causa: this.causas.find(
          (cause) => cause.id === +this.theFormGroup.get("causa")?.value
        )!,
      };

      this.service.create(newDeceased).subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          Swal.fire(
            "Creado",
            "El registro ha sido creado correctamente",
            "success"
          );
          this.router.navigate(["deceaseds/list"]);
        },
        (error) => {
          Swal.fire("Error", "Hubo un error al crear el registro", "error");
        }
      );
    }
  }
}
