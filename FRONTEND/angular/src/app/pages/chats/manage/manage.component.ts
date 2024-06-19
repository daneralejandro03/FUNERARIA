import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Chat } from "src/app/models/chat.model";
import { ChatService } from "src/app/services/chat.service";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common"; // Importar DatePipe
import { IncidentService } from "src/app/services/incident.service";
import { Incident } from "src/app/models/incident.model";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
  providers: [DatePipe], // Añadir DatePipe a los proveedores
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  chat: Chat;
  theFormGroup: FormGroup;
  trySend: boolean;
  incidents: Incident[];

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ChatService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe, // Inyectar DatePipe
    private incidentService: IncidentService
  ) {
    this.trySend = false;
    this.mode = 1;
    this.chat = {
      id: 0,
      start_date: null,
      state: false,
      incident: {
        id: null,
        date_decease: null,
        place_decease: "",
        cause_decease: "",
      },
    };
    this.incidents = [];

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.formBuilder.group({
      start_date: ["", [Validators.required]],
      state: [false, [Validators.required]],
      incident_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  incidentsList() {
    this.incidentService.list().subscribe((data) => {
      this.incidents = data;
      console.log(JSON.stringify(this.incidents));
    });
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
      this.chat.id = this.activeRoute.snapshot.params.id;
      this.getChat(this.chat.id);
    }

    this.incidentsList();
    this.configFormGroup();
  }

  getChat(id: number) {
    this.service.view(id).subscribe((data) => {
      this.chat = data;
      console.log("Chat -> " + JSON.stringify(this.chat));

      // Convertir la fecha a un formato compatible con datetime-local
      const formattedDate = this.datePipe.transform(
        this.chat.start_date,
        "yyyy-MM-ddThh:mm"
      );

      // Llenar el formulario con los datos obtenidos del servidor
      this.theFormGroup.patchValue({
        start_date: formattedDate,
        state: this.chat.state,
      });
    });
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor, complete los campos requeridos", "error");
      this.trySend = true;
      return;
    }

    // Obtener los datos del formulario y formatear la fecha
    const formData = this.theFormGroup.value;
    formData.start_date = this.datePipe.transform(
      formData.start_date,
      "yyyy-MM-dd"
    ); // Formatear la fecha
    console.log("Form data -> " + JSON.stringify(formData));
    this.service.create(formData).subscribe(
      (data) => {
        Swal.fire(
          "Creación exitosa",
          "Permiso creado correctamente",
          "success"
        );
        console.log("Permiso creado -> " + JSON.stringify(data));
        this.router.navigate(["chats/list"]);
      },
      (error) => {
        console.error("Error creating chat:", error);
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

    // Obtener los datos del formulario y formatear la fecha
    const formData = this.theFormGroup.value;
    formData.start_date = this.datePipe.transform(
      formData.start_date,
      "yyyy-MM-dd"
    ); // Formatear la fecha
    formData.id = this.chat.id; // Asegurar que el _id se envíe para la actualización
    this.service.update(formData).subscribe(
      (data) => {
        Swal.fire(
          "Actualización exitosa",
          "Permiso actualizado correctamente",
          "success"
        );
        console.log("Permiso actualizado -> " + JSON.stringify(data));
        this.router.navigate(["chats/list"]);
      },
      (error) => {
        console.error("Error updating chat:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al actualizar el permiso",
          "error"
        );
      }
    );
  }
}
