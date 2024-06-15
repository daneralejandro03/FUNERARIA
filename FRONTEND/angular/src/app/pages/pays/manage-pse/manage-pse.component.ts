import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PayService } from "src/app/services/pay.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage-pse",
  templateUrl: "./manage-pse.component.html",
  styleUrls: ["./manage-pse.component.scss"],
})
export class ManagePseComponent implements OnInit {
  theFormGroup: FormGroup;
  trySend: boolean;
  subscription_id: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private payService: PayService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.formBuilder.group({
      subscription_id: ["", Validators.required],
      bank: ["", Validators.required],
      value: ["", Validators.required],
      docType: ["", Validators.required],
      docNumber: ["", Validators.required],
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      cellPhone: ["", Validators.required],
      urlResponse: ["www.prueba.com", Validators.required],
      phone: ["", Validators.required],
      description: ["", Validators.required],
      invoice: ["", Validators.required],
      currency: ["", Validators.required],
      typePerson: [{ value: "", disabled: true }, Validators.required],
      address: ["", Validators.required],
      urlConfirmation: ["www.pruebaconfirmacion.com", Validators.required],
      methodConfirmation: ["", Validators.required],
    });

    // Habilitar o deshabilitar validación del campo typePerson según el valor de docType
    this.getTheFormGroup.docType.valueChanges.subscribe((value) => {
      const typePersonControl = this.getTheFormGroup.typePerson;
      if (value === "NIT") {
        typePersonControl.enable();
        typePersonControl.setValidators(Validators.required);
      } else {
        typePersonControl.disable();
        typePersonControl.clearValidators();
      }
      typePersonControl.updateValueAndValidity();
    });

    this.fillInvoiceNumber();
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  fillInvoiceNumber() {
    // Aquí puedes generar el número de factura automáticamente
    const randomInvoiceNumber = Math.floor(Math.random() * 1000000);
    this.theFormGroup.patchValue({
      invoice: randomInvoiceNumber.toString(),
    });
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

    const paymentData = this.theFormGroup.value;
    console.log("Datos del pago a crear:", paymentData);

    this.payService.directPaymentPSE(paymentData).subscribe(
      (data) => {
        console.log("Respuesta del servidor al crear el pago:", data);
        Swal.fire(
          "Pago PSE",
          "El pago PSE se ha realizado con éxito.",
          "success"
        );
        this.router.navigate(["pays/list"], {
          queryParams: { subscription_id: this.subscription_id },
        });
      },
      (error) => {
        console.error("Error al crear el pago PSE:", error);
        if (error.status === 422) {
          console.error("Errores de validación del servidor:", error.error);
          Swal.fire(
            "Error",
            "Errores de validación: " + JSON.stringify(error.error.errors),
            "error"
          );
        } else {
          Swal.fire("Error", "Error al crear el pago PSE.", "error");
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
