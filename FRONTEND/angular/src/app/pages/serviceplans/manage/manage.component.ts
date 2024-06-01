import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { ServicePlan } from 'src/app/models/service-plan.model';
import { Service } from 'src/app/models/service.model';
import { PlanService } from 'src/app/services/plan.service';
import { ServicePlanService } from 'src/app/services/service-plan.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->View, 2->Create, 3->Update 
  serviceplan: ServicePlan;
  theFormGroup: FormGroup;
  trySend: boolean;
  plan_id: number;
  service_id: number;
  plans: Plan[];
  services: Service[];
  isService: boolean;
  isPlan: boolean;

  constructor(private activateRoute: ActivatedRoute,
              private service: ServicePlanService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private thePlanService: PlanService,
              private theServiceService: ServiceService) { 
    
    this.trySend = false;
    this.mode = 1;
    this.serviceplan = {
      id: 0,
      date_hiring: null,
      status_hiring: null,
      date_expiration: null,
      plan_id: null,
      service_id: null,
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      date_hiring: ['',[Validators.required]],
      status_hiring: ['', [Validators.required]],
      date_expiration: ['', [Validators.required]],
      plan_id: [''],
      service_id: ['']
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    this.getPlans();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
  
    if(currentUrl.includes('view')){
      this.mode = 1;
    } else if(currentUrl.includes('create')){
      this.mode = 2;
      if (this.activateRoute.snapshot.params['planId']) {
        this.plan_id = this.activateRoute.snapshot.params['planId'];
        this.isPlan = true;
        this.isService = false;
        this.getServices();
      } else if (this.activateRoute.snapshot.params['serviceId']) {
        this.service_id = this.activateRoute.snapshot.params['serviceId'];
        this.isService = true;
        this.isPlan = false;
        this.getPlans();
      }
    } else if(currentUrl.includes('update')){
      this.mode = 3;
    }
  
    if(this.activateRoute.snapshot.params.id){
      this.serviceplan.id = this.activateRoute.snapshot.params.id;
      this.getServicePlan(this.serviceplan.id);
    }
  }
  

  getServicePlan(id: number) {
    this.service.view(id).subscribe(data => {
      this.serviceplan = data;

      this.theFormGroup.patchValue({
        date_hiring: this.serviceplan.date_hiring,
        status_hiring: this.serviceplan.status_hiring,
        date_expiration: this.serviceplan.date_expiration,
        plan_id: this.serviceplan.plan_id,
        service_id: this.serviceplan.service_id
    });

    if (this.serviceplan.plan_id) {
      this.isPlan = true;
      this.isService = false;
      this.getServices();
    } else if (this.serviceplan.service_id) {
      this.isService = true;
      this.isPlan = false;
      this.getPlans();
    }

      this.plan_id = this.serviceplan.plan_id;
      this.service_id = this.serviceplan.service_id;
    });
  }

  create() {
    if (this.plan_id) {
      this.serviceplan.plan_id = this.plan_id;
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
        return;
      }

      this.serviceplan.plan_id = this.plan_id;

      this.service.create(this.serviceplan).subscribe(data => {
        Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["serviceplans/list"], { queryParams: this.plan_id ? { planId: this.plan_id } : { serviceId: this.service_id } });
      });

    } 
    else if (this.service_id) {
      this.serviceplan.service_id = this.service_id;
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
        return;
      }

      this.serviceplan.service_id = this.service_id;
  
      this.service.create(this.serviceplan).subscribe(data => {
        Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["serviceplans/list"], { queryParams: this.plan_id ? { planId: this.plan_id } : { serviceId: this.service_id } });
      });
    }

  }

  update() {
    if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
        return;
    }

    if (this.plan_id) {
        this.serviceplan.plan_id = this.plan_id;
    } else if (this.service_id) {
        this.serviceplan.service_id = this.service_id;
    }

    this.service.update(this.serviceplan).subscribe(data => {
        Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
        this.router.navigate(["serviceplans/list"], { queryParams: this.plan_id ? { planId: this.plan_id } : { serviceId: this.service_id } });
    });
}


  getPlans() {
    this.thePlanService.list().subscribe(data => {
      this.plans = data;
      console.log("Plans:", JSON.stringify(this.plans));
    });
  }

  getServices() {
    this.theServiceService.list().subscribe(data => {
      this.services = data;
      console.log("Services:", JSON.stringify(this.services));
    });
  }

  selectPlan(plan_id: number) {
    console.log("Plan seleccionado:", plan_id);
    this.serviceplan.plan_id = plan_id;
  }
  
  selectService(service_id: number) {
    console.log("Service seleccionado:", service_id);
    this.serviceplan.service_id = service_id;
  }  

}


