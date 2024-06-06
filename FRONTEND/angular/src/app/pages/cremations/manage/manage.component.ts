import { query } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Cremation } from "src/app/models/cremation.model";
import { Service } from "src/app/models/service.model";
import { CremationService } from "src/app/services/cremation.service";
import { ServiceService } from "src/app/services/service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  cremation: Cremation;
  theFormGroup: FormGroup;
  trySend: boolean;
  wakeroomId: number;
  serviceAbstract: Service;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: CremationService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private serviceService: ServiceService
  ) {
    this.trySend = false;
    this.mode = 1;
    this.wakeroomId = 0;
    this.cremation = {
      id: 0,
      urn_type: "",
      destiny_ashes: "",
      service_id: 0,
      wake_room_id: 0,
    };

    this.serviceAbstract = {
      id: 0,
      type: "",
      start_date: null,
      end_date: null,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      type: ["", [Validators.required]],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      urn_type: ["", [Validators.required]],
      destiny_ashes: ["", Validators.required],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.wakeroomId = this.activateRoute.snapshot.params["wake_room_id"];
      console.log(`WakeRoom ID: ${this.wakeroomId}`);
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.cremation.id = this.activateRoute.snapshot.params.id;
      this.getWakeRoom(this.cremation.id);
    }
  }

  getWakeRoom(id: number) {
    this.service.view(id).subscribe(
      (data) => {
        this.cremation = data;

        this.serviceService.view(data.service_id).subscribe(
          (serviceData) => {
            this.serviceAbstract = serviceData;

            console.log(JSON.stringify(this.serviceAbstract));

            this.theFormGroup.patchValue({
              type: this.serviceAbstract.type,
              start_date: this.serviceAbstract.start_date,
              end_date: this.serviceAbstract.end_date,
              urn_type: this.cremation.urn_type,
              destiny_ashes: this.cremation.destiny_ashes,
              wake_room_id: this.cremation.wake_room_id,
            });
          },
          (error) => {
            Swal.fire("Error", "Error al cargar el servicio.", "error");
          }
        );
      },
      (error) => {
        Swal.fire("Error", "Error al cargar la cremación.", "error");
      }
    );
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Formulario inválido",
        "Por favor, rellene los campos requeridos.",
        "error"
      );
      return;
    }

    // Log de los datos que se están enviando
    console.log("Datos del servicio a crear:", this.serviceAbstract);

    this.serviceService.create(this.serviceAbstract).subscribe(
      (serviceData) => {
        console.log(
          "Respuesta del servidor al crear el servicio:",
          serviceData
        );
        this.cremation.service_id = serviceData.id;
        this.cremation.wake_room_id = this.wakeroomId;

        // Log de los datos de cremation que se están enviando
        console.log("Datos de la cremación a crear:", this.cremation);

        this.service.create(this.cremation).subscribe(
          (cremationData) => {
            console.log(
              "Respuesta del servidor al crear la cremación:",
              cremationData
            );
            Swal.fire(
              "Cremación creada",
              "La cremación ha sido creada con éxito.",
              "success"
            );
            this.router.navigate(["cremations/list"], {
              queryParams: { wake_room_id: this.wakeroomId },
            });
          },
          (error) => {
            console.error("Error al crear la cremación:", error);
            if (error.status === 422) {
              console.error("Errores de validación del servidor:", error.error);
              Swal.fire(
                "Error",
                "Errores de validación: " + JSON.stringify(error.error.errors),
                "error"
              );
            } else {
              Swal.fire("Error", "Error al crear la cremación.", "error");
            }
          }
        );
      },
      (error) => {
        console.error("Error al crear el servicio:", error);
        if (error.status === 422) {
          console.error("Errores de validación del servidor:", error.error);
          Swal.fire(
            "Error",
            "Errores de validación: " + JSON.stringify(error.error.errors),
            "error"
          );
        } else {
          Swal.fire("Error", "Error al crear el servicio.", "error");
        }
      }
    );
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario incompleto.",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }

    this.serviceService.update(this.serviceAbstract).subscribe(
      (serviceData) => {
        this.cremation.service_id = serviceData.id;

        this.cremation = { ...this.cremation, ...this.theFormGroup.value };

        this.service.update(this.cremation).subscribe(
          () => {
            Swal.fire(
              "Cremación actualizada",
              "La cremación ha sido actualizada con éxito.",
              "success"
            );
            this.router.navigate(["cremations/list"], {
              queryParams: { wake_room_id: this.cremation.wake_room_id },
            });
          },
          (error) => {
            Swal.fire("Error", "Error al actualizar la cremación.", "error");
          }
        );
      },
      (error) => {
        Swal.fire("Error", "Error al actualizar el servicio.", "error");
      }
    );
  }
}
