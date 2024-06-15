import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Site } from "src/app/models/site.model";
import { ApiColombiaService } from "src/app/services/api-colombia.service";
import { SiteService } from "src/app/services/site.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  departments: any[];
  cities: any[];
  mode: number; // 1: view, 2: create, 3: update
  site: Site;
  theFormGroup: FormGroup;
  trySend: boolean;
  constructor(
    private apiColombiaService: ApiColombiaService,
    private activeteRoute: ActivatedRoute,
    private service: SiteService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.departments = [];

    this.cities = [];

    this.trySend = false;

    this.mode = 1;

    this.site = {
      id: 0,
      name: "",
      location: "",
      email: "",
      department_id: 0,
      city_id: 0,
      WakeRooms: null,
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activeteRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    this.loadDepartments();

    if (this.activeteRoute.snapshot.params.id) {
      this.site.id = this.activeteRoute.snapshot.params.id;
      this.getSite(this.site.id);
    }

    this.configFormGroup();
  }

  configFormGroup() {
    //primer elemento del vector es el valor por defecto
    //lista, seran las reglas

    this.theFormGroup = this.theFormBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      location: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      department_id: [0, [Validators.required]],
      city_id: [0, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getSite(id: number): void {
    this.service.view(id).subscribe((data) => {
      this.site = data; // Actualiza this.site con los datos recibidos

      if (this.site.department_id) {
        this.onDepartmentChange(this.site.department_id.toString()); // Carga las ciudades del departamento
      }

      this.theFormGroup.patchValue(this.site); // Parchea el formulario con los datos actualizados
    });
  }

  loadDepartments(): void {
    this.apiColombiaService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  onDepartmentChange(departmentId: string): void {
    this.apiColombiaService
      .getCitiesByDepartment(departmentId.toString())
      .subscribe((data) => {
        this.cities = data;
      });
  }

  create(): void {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.service.create(this.site).subscribe((data) => {
        console.log(JSON.stringify(data));
        Swal.fire(
          "Creado",
          "El registro ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["sites/list"]);
      });
    }
  }

  update(): void {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene todos los campos", "error");
    } else {
      this.service.update(this.site).subscribe((data) => {
        console.log(JSON.stringify(data));
        Swal.fire(
          "Creado",
          "El registro ha actualizado correctamente",
          "success"
        );
        this.router.navigate(["sites/list"]);
      });
    }
  }
}
