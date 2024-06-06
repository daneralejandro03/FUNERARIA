import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExecutionServices } from 'src/app/models/execution-services.model';
import { ExecutionServiceService } from 'src/app/services/execution-service.service';
import { IncidentService } from 'src/app/services/incident.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  executionservices: ExecutionServices[];
  executionservicesAux: ExecutionServices[];
  incident_id: number;
  service_id: number;
  isIncident: boolean = false;
  isService: boolean = false;

  constructor(private service:ExecutionServiceService, 
              private router:Router, 
              private route: ActivatedRoute,
              private incidentService: IncidentService,
              private serviceService: ServiceService
            ) {
    this.executionservices = [];
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let incidentId = params['incidentId'] || null;
      let serviceId = params['serviceId'] || null;

      if(incidentId != null){
        this.isIncident = true;
        this.isService = false;
        this.listIncidents(incidentId)
      }

      if(serviceId != null){
        this.isIncident = false;
        this.isService = true;
        this.listServices(serviceId)
      }
    })
  }

  listIncidents(incidentId:number){
    this.incidentService.view(incidentId).subscribe(data=>{
      this.incident_id = incidentId;

      
      this.executionservices = data["execution_services"];
      this.executionservicesAux = [];
  
      for(let executionservice of this.executionservices){
        this.service.view(executionservice.id).subscribe(executionservicesAux => {
          this.executionservicesAux.push(executionservicesAux);
        })
      }

    });
  }

  listServices(serviceId:number){
    this.serviceService.view(serviceId).subscribe(data=>{
      this.service_id = serviceId;
      
      this.executionservices = data["execution_services"];
      this.executionservicesAux = [];
  
      for(let serviceplan of this.executionservices){
        this.service.view(serviceplan.id).subscribe(executionservicesAux => {
          this.executionservicesAux.push(executionservicesAux);
        })
      }

    });
  }
  

  view(id:number){
    this.router.navigate(["executionservices/view/"+id])
  }

  createWithIncident(incident_id:number){

    this.router.navigate(["executionservices/create/incident/"+incident_id])
  }

  createWithService(service_id:number){

    this.router.navigate(["executionservices/create/service/"+service_id])
  }

  updateWithIncident(id: number, incident_id: number) {
    this.router.navigate(["executionservices/update/"+id], { queryParams: { incidentId: incident_id } } );
  }

  updateWithService(id: number, service_id: number) {
    this.router.navigate(["executionservices/update/"+id], { queryParams: { serviceId: service_id } } );
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
