import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { Incident } from 'src/app/models/incident.model';
import { CustomerService } from 'src/app/services/customer.service';
import { IncidentService } from 'src/app/services/incident.service';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->View, 2->Create, 3->Update 
  report: Report;
  theFormGroup: FormGroup;
  trySend: boolean;
  customer_id: number;
  incident_id: number;
  customers: Customer[];
  incidents: Incident[];
  isCustomer: boolean;
  isIncident: boolean;

  constructor(private activateRoute: ActivatedRoute,
    private service: ReportService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private theCustomerService: CustomerService,
    private theIncidentService: IncidentService) {

    this.trySend = false;
    this.mode = 1;
    this.report = {
      id: 0,
      reporting_date: null,
      description: "",
      state: null,
      customer_id: null,
      incident_id: null
    };
  }

  configFormGroup() {
    if(this.isIncident){
      this.theFormGroup = this.theFormBuilder.group({
        reporting_date: ['', [Validators.required]],
        description: ['', [Validators.required]],
        state: [''],
        customer_id: ['', [Validators.required]],
        incident_id: ['']
  
      });
    }
    else{
      this.theFormGroup = this.theFormBuilder.group({
        reporting_date: ['', [Validators.required]],
        description: ['', [Validators.required]],
        state: [''],
        incident_id: ['', [Validators.required]],
        customer_id: ['']
  
      });
    }
    
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
      if (this.activateRoute.snapshot.params['customerId']) {
        this.customer_id = +this.activateRoute.snapshot.params['customerId'];
        this.isCustomer = true;
        this.isIncident = false;
        this.getIncidents();
      } else if (this.activateRoute.snapshot.params['incidentId']) {
        this.incident_id = +this.activateRoute.snapshot.params['incidentId'];
        this.isIncident = true;
        this.isCustomer = false;
        this.getCustomers();
      }
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.report.id = this.activateRoute.snapshot.params.id;
      this.getReport(this.report.id);
    }

    this.configFormGroup();
  }



  getReport(id: number) {
    this.service.view(id).subscribe(data => {
      this.report = data;

      this.theFormGroup.patchValue({
        reporting_date: this.report.reporting_date,
        description: this.report.description,
        state: this.report.state,
        customer_id: this.report.customer_id,
        incident_id: this.report.incident_id
      });

      if (this.report.customer_id) {
        this.isCustomer = true;
        this.isIncident = false;
        this.getIncidents(); // Cargar incidents en caso de ser customer
      } else if (this.report.incident_id) {
        this.isCustomer = false;
        this.isIncident = true;
        this.getCustomers(); // Cargar customers en caso de ser incident
      }

      this.customer_id = this.report.customer_id;
      this.incident_id = this.report.incident_id;
    });
  }


  create() {
    if (this.customer_id) {
      this.report.customer_id = this.customer_id;
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
        return;
      }

      this.report.customer_id = this.customer_id;

      this.service.create(this.report).subscribe(data => {
        Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["reports/list"], { queryParams: this.isCustomer ? { customerId: this.customer_id } : { incidentId: this.incident_id } });
      });

    }
    else if (this.incident_id) {
      this.report.incident_id = this.incident_id;
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
        return;
      }

      this.report.incident_id = this.incident_id;

      this.service.create(this.report).subscribe(data => {
        Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["reports/list"], { queryParams: this.isCustomer ? { customerId: this.customer_id } : { incidentId: this.incident_id } });
      });
    }

  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    if (this.customer_id) {
      this.report.customer_id = this.customer_id;
    } else if (this.incident_id) {
      this.report.incident_id = this.incident_id;
    }

    this.service.update(this.report).subscribe(data => {
      Swal.fire("Actualización Exitosa", "Se ha actualizado el registro", "success");
      this.router.navigate(["reports/list"], { queryParams: this.isCustomer ? { customerId: this.customer_id } : { incidentId: this.incident_id } });
    });
  }


  getCustomers() {
    this.theCustomerService.list().subscribe(data => {
      this.customers = data;
    });
  }

  getIncidents() {
    this.theIncidentService.list().subscribe(data => {
      this.incidents = data;
    });
  }

  selectCustomer(customer_id: number) {
    this.report.customer_id = customer_id;
  }

  selectIncident(incident_id: number) {
    this.report.incident_id = incident_id;
  }

}
