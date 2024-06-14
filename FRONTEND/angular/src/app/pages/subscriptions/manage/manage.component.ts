import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Plan } from "src/app/models/plan.model";
import { Subscription } from "src/app/models/subscription.model";
import { PlanService } from "src/app/services/plan.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  subscription: Subscription;
  theFormGroup: FormGroup;
  trySend: boolean;
  customerId: number;
  plans: Plan[];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: SubscriptionService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private thePlanService: PlanService
  ) {
    this.trySend = false;
    this.mode = 1;
    this.subscription = {
      id: 0,
      subscription_type: "",
      start_date: null,
      end_date: null,
      state: null,
      plan_id: null,
      customer_id: null,
      pays: null,
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      //Primer elemento del vector, valor por defecto
      //Lista seran las reglas
      subscription_type: ["", [Validators.required, Validators.minLength(5)]],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
      plan_id: ["", [Validators.required]],
      state: [""]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  /*
getTheaterData(){
this.theater.capacity = this.getTheFormGroup.capacity.value;
this.theater.location = this.getTheFormGroup.location.value;
}*/

  ngOnInit(): void {
    this.getPlans();
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.customerId = this.activateRoute.snapshot.params["customerId"];
      console.log(`Customer ID: ${this.customerId}`);
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.subscription.id = this.activateRoute.snapshot.params.id;
      this.getSubscription(this.subscription.id);
    }
  }

  getSubscription(id: number) {
    this.service.view(id).subscribe((data) => {
      this.subscription = data;

      this.theFormGroup.patchValue({
        subscription_type: this.subscription.subscription_type,
        start_date: this.subscription.start_date,
        end_date: this.subscription.end_date,
        state: this.subscription.state,
        plan_id: this.subscription.plan_id,
      });

      this.customerId = this.subscription.customer_id;

      console.log("Subscription: " + JSON.stringify(this.subscription));
    });
  }

  create() {
    console.log(
      `Customer Id desde el componente de subscripcion: ${this.customerId}`
    );
    this.subscription.customer_id = this.customerId;

    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario incompleto.",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    console.log(JSON.stringify(this.subscription));
    this.service.create(this.subscription).subscribe((data) => {
      Swal.fire(
        "Creación Exitosa",
        "Se ha creado un nuevo registro",
        "success"
      );
      this.router.navigate(["subscriptions/list/"], {
        queryParams: { customerId: this.customerId },
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

    this.subscription.customer_id = this.customerId;

    this.subscription = { ...this.subscription, ...this.theFormGroup.value };
    console.log(this.customerId);

    this.service.update(this.subscription).subscribe((data) => {
      Swal.fire(
        "Actualización Exitosa",
        "Se ha actualizado un nuevo registro",
        "success"
      );
      this.router.navigate(["subscriptions/list"], {
        queryParams: { customerId: this.customerId },
      });
    });
  }

  getPlans() {
    this.thePlanService.list().subscribe((data) => {
      this.plans = data;
      console.log(JSON.stringify(this.plans));
    });
  }

  selectPlan(plan_id: number) {
    console.log("Plan seleccionado:", plan_id);
    this.subscription.plan_id = plan_id;
  }
}
