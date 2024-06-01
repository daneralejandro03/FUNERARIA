import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from 'src/app/models/report.model';
import { CustomerService } from 'src/app/services/customer.service';
import { IncidentService } from 'src/app/services/incident.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  reports: Report[];
  reportsAux: Report[];
  customer_id: number;
  incident_id: number;
  isCustomer: boolean = false;
  isIncident: boolean = false;

  constructor(private service:ReportService, 
              private router:Router, 
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private incidentService: IncidentService
            ) {
    this.reports = [];
   }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params =>{
      let customerId = params['customerId'] || null;
      let incidentId = params['incidentId'] || null;

      if(customerId != null){
        this.isCustomer = true;
        this.isIncident = false;
        this.listCustomers(customerId)
      }

      if(incidentId != null){
        this.isCustomer = false;
        this.isIncident = true;
        this.listIncidents(incidentId)
      }
    })
  }

  listCustomers(customerId:number){
    this.customerService.view(customerId).subscribe(data=>{
      this.customer_id = customerId;

      
      this.reports = data["reports"];
      this.reportsAux = [];
  
      for(let report of this.reports){
        this.service.view(report.id).subscribe(reportData => {
          this.reportsAux.push(reportData);
        })
      }

    });
  }

  listIncidents(incidentId:number){
    this.incidentService.view(incidentId).subscribe(data=>{
      this.incident_id = incidentId;
      
      this.reports = data["reports"];
      this.reportsAux = [];
  
      for(let report of this.reports){
        this.service.view(report.id).subscribe(reportData => {
          this.reportsAux.push(reportData);
        })
      }

    });
  }
  

  view(id:number){
    this.router.navigate(["reports/view/"+id])
  }

  createWithCustomer(customer_id){

    this.router.navigate(["reports/create/customer/"+customer_id])
  }

  createWithIncident(incident_id){
  
    this.router.navigate(["reports/create/incident/"+incident_id])
  }

  update(id:number){
    this.router.navigate(["reports/update/"+id])
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
