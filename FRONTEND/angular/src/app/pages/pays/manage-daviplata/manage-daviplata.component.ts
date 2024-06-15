import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PayService } from "src/app/services/pay.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage-daviplata",
  templateUrl: "./manage-daviplata.component.html",
  styleUrls: ["./manage-daviplata.component.scss"],
})
export class ManageDaviplataComponent implements OnInit {
  theFormGroup: FormGroup;
  trySend: boolean;
  subscription_id: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private daviplataService: PayService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.formBuilder.group({
      subscription_id: ["", Validators.required],
      docType: ["", Validators.required],
      document: ["", Validators.required],
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      indCountry: ["COL", Validators.required],
      phone: ["", Validators.required],
      country: ["CO", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      value: ["", Validators.required],
      methodConfirmation: ["", Validators.required],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.subscription_id = +params["id"];
      console.log(`Subscription ID: ${this.subscription_id}`);
      this.theFormGroup.patchValue({
        subscription_id: this.subscription_id.toString(),
      });
    });
  }

  create() {
    //this.clearValidators();
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Formulario inválido",
        "Por favor, rellene los campos requeridos correctamente.",
        "error"
      );
      return;
    }

    const daviplataData = this.theFormGroup.value;
    console.log("Datos del Daviplata a crear:", daviplataData);

    this.daviplataService.directPaymentDaviplata(daviplataData).subscribe(
      (data) => {
        console.log("Respuesta del servidor al crear Daviplata:", data);
        Swal.fire(
          "Daviplata",
          "El pago con Daviplata se ha realizado con éxito.",
          "success"
        );
        this.router.navigate(["pays/list"], {
          queryParams: { subscription_id: this.subscription_id },
        });
      },
      (error) => {
        console.error("Error al crear el pago con Daviplata:", error);
        if (error.status === 422) {
          console.error("Errores de validación del servidor:", error.error);
          Swal.fire(
            "Error",
            "Errores de validación: " + JSON.stringify(error.error.errors),
            "error"
          );
        } else {
          Swal.fire("Error", "Error al crear el pago con Daviplata.", "error");
        }
      }
    );
  }

  clearValidators() {
    Object.keys(this.theFormGroup.controls).forEach((controlName) => {
      const control = this.theFormGroup.get(controlName);
      control.clearValidators();
      control.updateValueAndValidity();
    });
  }
}
