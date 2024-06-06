import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Burial } from "src/app/models/burial.model";
import { Service } from "src/app/models/service.model";
import { BurialService } from "src/app/services/burial.service";
import { ServiceService } from "src/app/services/service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  burial: Burial;
  theFormGroup: FormGroup;
  trySend: boolean;
  wakeroomId: number;
  serviceAbstract: Service;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: BurialService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private serviceService: ServiceService
  ) {
    this.trySend = false;
    this.mode = 1;
    this.wakeroomId = 0;
    this.burial = {
      id: 0,
      location: "",
      cementery: "",
      burial_type: "",
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
      location: ["", Validators.required],
      cementery: ["", Validators.required],
      burial_type: ["", [Validators.required]],
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
      this.burial.id = this.activateRoute.snapshot.params.id;
      this.getWakeRoom(this.burial.id);
    }
  }

  getWakeRoom(id: number) {
    this.service.view(id).subscribe(
      (data) => {
        this.burial = data;

        this.serviceService.view(data.service_id).subscribe(
          (serviceData) => {
            this.serviceAbstract = serviceData;

            console.log(JSON.stringify(this.serviceAbstract));

            this.theFormGroup.patchValue({
              type: this.serviceAbstract.type,
              start_date: this.serviceAbstract.start_date,
              end_date: this.serviceAbstract.end_date,
              location: this.burial.location,
              cementery: this.burial.cementery,
              burial_type: this.burial.burial_type,
              wake_room_id: this.burial.wake_room_id,
            });
          },
          (error) => {
            Swal.fire("Error", "Error al cargar el servicio.", "error");
          }
        );
      },
      (error) => {
        Swal.fire("Error", "Error al cargar la cepultura.", "error");
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
        this.burial.service_id = serviceData.id;
        this.burial.wake_room_id = this.wakeroomId;

        // Log de los datos de burial que se están enviando
        console.log("Datos de la cepultura a crear:", this.burial);

        this.service.create(this.burial).subscribe(
          (cremationData) => {
            console.log(
              "Respuesta del servidor al crear la cepultura:",
              cremationData
            );
            Swal.fire(
              "Cremación creada",
              "La cepultura ha sido creada con éxito.",
              "success"
            );
            this.router.navigate(["burials/list"], {
              queryParams: { wake_room_id: this.wakeroomId },
            });
          },
          (error) => {
            console.error("Error al crear la cepultura:", error);
            if (error.status === 422) {
              console.error("Errores de validación del servidor:", error.error);
              Swal.fire(
                "Error",
                "Errores de validación: " + JSON.stringify(error.error.errors),
                "error"
              );
            } else {
              Swal.fire("Error", "Error al crear la cepultura.", "error");
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

    console.log("Updating service with data:", this.serviceAbstract);

    this.serviceService.update(this.serviceAbstract).subscribe(
      (serviceData) => {
        console.log("Service updated successfully:", serviceData);
        this.burial.service_id = serviceData.id;
        this.burial = { ...this.burial, ...this.theFormGroup.value };

        console.log("Updating burial with data:", this.burial);

        this.service.update(this.burial).subscribe(
          (updatedBurial) => {
            console.log("Burial updated successfully:", updatedBurial);
            Swal.fire(
              "Cremación actualizada",
              "La cepultura ha sido actualizada con éxito.",
              "success"
            );
            this.router.navigate(["burials/list"], {
              queryParams: { wake_room_id: this.burial.wake_room_id },
            });
          },
          (error) => {
            console.error("Error updating burial:", error);
            Swal.fire("Error", "Error al actualizar la cepultura.", "error");
          }
        );
      },
      (error) => {
        console.error("Error updating service:", error);
        Swal.fire("Error", "Error al actualizar el servicio.", "error");
      }
    );
  }
}
