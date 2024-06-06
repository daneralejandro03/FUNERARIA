import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PayService } from "src/app/services/pay.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage-credit-card",
  templateUrl: "./manage-credit-card.component.html",
  styleUrls: ["./manage-credit-card.component.scss"],
})
export class ManageCreditCardComponent implements OnInit {
  theFormGroup: FormGroup;
  trySend: boolean;
  subscription_id: number; // Variable para almacenar el ID de la suscripción
  years: number[];
  months: { value: string; name: string }[];

  constructor(
    private activateRoute: ActivatedRoute,
    private creditCardService: PayService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.years = [];
    this.months = [];
    this.trySend = false;
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      subscription_id: ["", Validators.required], // Campo del ID de la suscripción
      value: ["", Validators.required],
      docType: ["", Validators.required],
      docNumber: ["", Validators.required],
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      cellPhone: ["", Validators.required],
      phone: [""],
      cardNumber: [
        "",
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(16),
          Validators.pattern("^[0-9]*$"),
        ],
      ],
      cardExpYear: [null, Validators.required],
      cardExpMonth: [null, Validators.required],
      cardCvc: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(4),
          Validators.pattern("^[0-9]*$"), // Solo números
        ],
      ],
      dues: ["", Validators.required],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      this.subscription_id = +params["id"]; // Obtener el subscription_id de la URL
      console.log(`Subscription ID: ${this.subscription_id}`);
      this.theFormGroup.patchValue({
        subscription_id: this.subscription_id.toString(),
      }); // Establecer subscription_id en el formulario
    });

    // Generar el rango de años (desde el año actual hasta 20 años en el futuro)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 20; year++) {
      this.years.push(year);
    }

    // Generar el rango de meses
    const monthsNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    for (let i = 1; i <= 12; i++) {
      this.months.push({
        value: (i < 10 ? "0" : "") + i.toString(),
        name: monthsNames[i - 1],
      });
    }
  }

  create() {
    this.clearValidators();
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Formulario inválido",
        "Por favor, rellene los campos requeridos correctamente.",
        "error"
      );
      return;
    }

    const creditCardData = this.theFormGroup.value;
    console.log("Datos de la tarjeta de crédito a crear:", creditCardData);

    this.creditCardService.directPaymentCreditcard(creditCardData).subscribe(
      (data) => {
        console.log(
          "Respuesta del servidor al crear la tarjeta de crédito:",
          data
        );
        Swal.fire(
          "Tarjeta de crédito",
          "La tarjeta de crédito ha realizado el pago con éxito.",
          "success"
        );
        this.router.navigate(["pays/list"], {
          queryParams: { subscription_id: this.subscription_id },
        });
      },
      (error) => {
        console.error("Error al crear la tarjeta de crédito:", error);
        if (error.status === 422) {
          console.error("Errores de validación del servidor:", error.error);
          Swal.fire(
            "Error",
            "Errores de validación: " + JSON.stringify(error.error.errors),
            "error"
          );
        } else {
          Swal.fire("Error", "Error al crear la tarjeta de crédito.", "error");
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
