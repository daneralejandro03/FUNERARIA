import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { City } from "src/app/models/city.model";
import { Department } from "src/app/models/department.model";
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
  departments: Department[];
  cities: City[];
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
      department_id: null,
      city_id: null,
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
      department_id: [null, [Validators.required, this.numberValidator()]], // Inicializado con null y validador personalizado
      city_id: [null, [Validators.required, this.numberValidator()]], // Inicializado con null y validador personalizado
    });

    // Suscripción a cambios en department_id para cargar ciudades y validar automáticamente
    this.theFormGroup
      .get("department_id")
      .valueChanges.subscribe((departmentId) => {
        if (departmentId) {
          this.onDepartmentChange(departmentId.toString());
        }
      });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  numberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[0-9]*$/.test(control.value);
      return valid ? null : { invalidNumber: true };
    };
  }

  getSite(id: number): void {
    this.service.view(id).subscribe(
      (data: Site) => {
        this.site = data;
        if (this.site.department_id) {
          this.onDepartmentChange(this.site.department_id.toString());
        }
        this.theFormGroup.patchValue(this.site);
      },
      (error) => {
        console.error("Error fetching site:", error);
        Swal.fire(
          "Error",
          "Ocurrió un error al obtener los datos del sitio",
          "error"
        );
      }
    );
  }

  loadDepartments(): void {
    this.apiColombiaService.getDepartments().subscribe(
      (data: Department[]) => {
        this.departments = data;
      },
      (error) => {
        console.error("Error loading departments:", error);
        Swal.fire(
          "Error",
          "Ocurrió un error al cargar los departamentos",
          "error"
        );
      }
    );
  }

  onDepartmentChange(departmentId: string): void {
    if (!departmentId) {
      this.cities = []; // Puedes decidir qué hacer si departmentId es null o undefined
      return;
    }
    this.apiColombiaService.getCitiesByDepartment(departmentId).subscribe(
      (data: City[]) => {
        this.cities = data;

        // Validar automáticamente la ciudad seleccionada
        const selectedCityId = this.theFormGroup.get("city_id").value;
        if (selectedCityId && !this.isValidCity(selectedCityId)) {
          this.theFormGroup.get("city_id").setValue(null); // Limpiar la selección
        }
      },
      (error) => {
        console.error("Error loading cities:", error);
        Swal.fire("Error", "Ocurrió un error al cargar las ciudades", "error");
      }
    );
  }

  isValidCity(cityId: number): boolean {
    return this.cities.some((city) => city.id === cityId);
  }

  create(): void {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Error",
        "Por favor llene todos los campos correctamente",
        "error"
      );
      return;
    }

    this.service.create(this.site).subscribe(
      (data: Site) => {
        Swal.fire(
          "Creado",
          "El registro ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["sites/list"]);
      },
      (error) => {
        console.error("Error creating site:", error);
        Swal.fire("Error", "Ocurrió un error al crear el sitio", "error");
      }
    );
  }

  update(): void {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Error",
        "Por favor llene todos los campos correctamente",
        "error"
      );
      return;
    }

    const updateData = {
      ...this.site,
      department_id: Number(this.site.department_id),
      city_id: Number(this.site.city_id),
    };

    this.service.update(updateData).subscribe(
      (data: Site) => {
        this.site = data;
        console.log("Site updated:", this.site);

        Swal.fire(
          "Actualizado",
          "El registro ha sido actualizado correctamente",
          "success"
        );
        this.router.navigate(["sites/list"]);
      },
      (error) => {
        console.error("Error updating site:", error);
        Swal.fire("Error", "Ocurrió un error al actualizar el sitio", "error");
      }
    );
  }
}
