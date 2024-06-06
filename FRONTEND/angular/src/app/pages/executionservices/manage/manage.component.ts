import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExecutionServices } from 'src/app/models/execution-services.model';
import { Incident } from 'src/app/models/incident.model';
import { Service } from 'src/app/models/service.model';
import { ExecutionServiceService } from 'src/app/services/execution-service.service';
import { IncidentService } from 'src/app/services/incident.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number; // 1->View, 2->Create, 3->Update 
  executionservice: ExecutionServices;
  theFormGroup: FormGroup;
  trySend: boolean;
  incident_id: number;
  service_id: number;
  incidents: Incident[];
  services: Service[];
  isService: boolean;
  isIncident: boolean;

  constructor(private activateRoute: ActivatedRoute,
              private service: ExecutionServiceService,
              private router: Router,
              private theFormBuilder: FormBuilder,
              private theIncidentService: IncidentService,
              private theServiceService: ServiceService) { 
    
    this.trySend = false;
    this.mode = 1;
    this.executionservice = {
      id: 0,
      cost: 0,
      duration: null,
      state: null,
      incident_id: null,
      service_id: null,
    };

    this.configFormGroup();
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      cost: ['',[Validators.required]],
      duration: ['', [Validators.required]],
      state: ['', [Validators.required]],
      incident_id: [''],
      service_id: ['']
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
  
    if(currentUrl.includes('view')){
      this.mode = 1;
    } else if(currentUrl.includes('create')){
      this.mode = 2;
      if (this.activateRoute.snapshot.params['incidentId']) {
        this.incident_id = this.activateRoute.snapshot.params['incidentId'];
        this.isIncident = true;
        this.isService = false;
        this.getServices();
      } else if (this.activateRoute.snapshot.params['serviceId']) {
        this.service_id = this.activateRoute.snapshot.params['serviceId'];
        this.isService = true;
        this.isIncident = false;
        this.getIncidents();
      }
    } else if(currentUrl.includes('update')){
      this.mode = 3;
    }
  
    if(this.activateRoute.snapshot.params.id){
      this.executionservice.id = this.activateRoute.snapshot.params.id;
      this.getExecutionService(this.executionservice.id);
    }
  }
  

  getExecutionService(id: number) {
    this.service.view(id).subscribe(data => {
      this.executionservice = data;

      this.theFormGroup.patchValue({
        cost: this.executionservice.cost,
        duration: this.executionservice.duration,
        state: this.executionservice.state,
        incident_id: this.executionservice.incident_id,
        service_id: this.executionservice.service_id
    });

    if (this.executionservice.incident_id) {
      this.isIncident = true;
      this.isService = false;
      this.getServices();
    } else if (this.executionservice.service_id) {
      this.isService = true;
      this.isIncident = false;
      this.getIncidents();
    }

      this.incident_id = this.executionservice.incident_id;
      this.service_id = this.executionservice.service_id;
    });
  }

  create() {
    if (this.incident_id) {
      this.executionservice.incident_id = this.incident_id;
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
        return;
      }

      this.executionservice.incident_id = this.incident_id;

      this.service.create(this.executionservice).subscribe(data => {
        Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["executionservices/list"], { queryParams: this.incident_id ? { incidentId: this.incident_id } : { serviceId: this.service_id } });
      });

    } 
    else if (this.service_id) {
      this.executionservice.service_id = this.service_id;
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
        return;
      }

      this.executionservice.service_id = this.service_id;
  
      this.service.create(this.executionservice).subscribe(data => {
        Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["executionservices/list"], { queryParams: this.incident_id ? { incidentId: this.incident_id } : { serviceId: this.service_id } });
      });
    }

  }

  update() {
    if (this.incident_id) {
      this.executionservice.incident_id = this.incident_id;
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
        return;
      }

      this.executionservice.incident_id = this.incident_id;

      this.service.update(this.executionservice).subscribe(data => {
        Swal.fire("Actualización Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["executionservices/list"], { queryParams: this.incident_id ? { incidentId: this.incident_id } : { serviceId: this.service_id } });
      });

    } 
    else if (this.service_id) {
      this.executionservice.service_id = this.service_id;
      if (this.theFormGroup.invalid) {
        this.trySend = true;
        Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
        return;
      }

      this.executionservice.service_id = this.service_id;
  
      this.service.update(this.executionservice).subscribe(data => {
        Swal.fire("Actualización Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["executionservices/list"], { queryParams: this.incident_id ? { incidentId: this.incident_id } : { serviceId: this.service_id } });
      });
    }
}


  getIncidents() {
    this.theIncidentService.list().subscribe(data => {
      this.incidents = data;
    });
  }

  getServices() {
    this.theServiceService.list().subscribe(data => {
      this.services = data;
    });
  }

  selectIncident(incident_id: number) {
    console.log("Incidente seleccionado:", incident_id);
    this.executionservice.incident_id = incident_id;
  }
  
  selectService(service_id: number) {
    console.log("Service seleccionado:", service_id);
    this.executionservice.service_id = service_id;
  }  


}
