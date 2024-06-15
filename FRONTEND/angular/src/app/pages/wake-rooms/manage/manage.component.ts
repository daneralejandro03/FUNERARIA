import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { WakeRoom } from "src/app/models/wake-room.model";
import { WakeRoomsService } from "src/app/services/wake-rooms.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  wakeroom: WakeRoom;
  theFormGroup: FormGroup;
  trySend: boolean;
  siteId: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private service: WakeRoomsService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.wakeroom = {
      id: 0,
      name: "",
      capacity: 0,
      availability: false,
      site_id: 0,
    };
    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ["", [Validators.required]],
      capacity: [1, [Validators.required, Validators.min(1)]],
      availability: [false, Validators.required],
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
      this.siteId = this.activateRoute.snapshot.params["site_id"];
      console.log(`Site ID: ${this.siteId}`);
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.wakeroom.id = this.activateRoute.snapshot.params.id;
      this.getWakeRoom(this.wakeroom.id);
    }
  }

  getWakeRoom(id: number) {
    this.service.view(id).subscribe((data) => {
      this.wakeroom = data;

      this.theFormGroup.patchValue({
        name: this.wakeroom.name,
        capacity: this.wakeroom.capacity,
        availability: this.wakeroom.availability,
      });

      this.siteId = this.wakeroom.site_id;

      console.log("WakeRoom: " + JSON.stringify(this.wakeroom));
    });
  }

  create() {
    console.log(`Site ID from the manage component: ${this.siteId}`);
    this.wakeroom.site_id = this.siteId;

    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario incompleto.",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    console.log(JSON.stringify(this.wakeroom));
    this.service.create(this.wakeroom).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["wakerooms/list"], {
        queryParams: { siteId: this.siteId },
      });
    });
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

    this.wakeroom.site_id = this.siteId;

    this.wakeroom = { ...this.wakeroom, ...this.theFormGroup.value };
    console.log(this.siteId);

    this.service.update(this.wakeroom).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["wakerooms/list"], {
        queryParams: { siteId: this.siteId },
      });
    });
  }
}
