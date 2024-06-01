import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePlan } from 'src/app/models/service-plan.model';
import { PlanService } from 'src/app/services/plan.service';
import { ServicePlanService } from 'src/app/services/service-plan.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  servicesplans: ServicePlan[];
  servicesplansAux: ServicePlan[];
  plan_id: number;
  service_id: number;
  isPlan: boolean = false;
  isService: boolean = false;

  constructor(private service:ServicePlanService, 
              private router:Router, 
              private route: ActivatedRoute,
              private planService: PlanService,
              private serviceService: ServiceService
            ) {
    this.servicesplans = [];
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let planId = params['planId'] || null;
      let serviceId = params['serviceId'] || null;

      if(planId != null){
        this.isPlan = true;
        this.isService = false;
        this.listPlans(planId)
      }

      if(serviceId != null){
        this.isPlan = false;
        this.isService = true;
        this.listServices(serviceId)
      }
    })
  }

  listPlans(planId:number){
    this.planService.view(planId).subscribe(data=>{
      this.plan_id = planId;

      
      this.servicesplans = data["servicesplan"];
      this.servicesplansAux = [];
  
      for(let serviceplan of this.servicesplans){
        this.service.view(serviceplan.id).subscribe(servicesplansData => {
          this.servicesplansAux.push(servicesplansData);
        })
      }

    });
  }

  listServices(serviceId:number){
    this.serviceService.view(serviceId).subscribe(data=>{
      this.service_id = serviceId;
      
      this.servicesplans = data["servicesplan"];
      this.servicesplansAux = [];
  
      for(let serviceplan of this.servicesplans){
        this.service.view(serviceplan.id).subscribe(servicesplansData => {
          this.servicesplansAux.push(servicesplansData);
        })
      }

    });
  }
  

  view(id:number){
    this.router.navigate(["serviceplans/view/"+id])
  }

  createWithPlan(plan_id){

    this.router.navigate(["serviceplans/create/"+plan_id])
  }

  createWithService(service_id){
  
    this.router.navigate(["serviceplans/create/"+service_id])
  }

  update(id:number){
    this.router.navigate(["serviceplans/update/"+id])
  }

  delete(id:number){
    console.log("Eliminando a: " + id);
    Swal.fire({
        title: 'Eliminar',
        text: "Está seguro que quiere eliminar el registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).
        subscribe(data => {
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminada correctamente',
          'success'
      )
        this.ngOnInit();
        });
      }
      })
  }

}
