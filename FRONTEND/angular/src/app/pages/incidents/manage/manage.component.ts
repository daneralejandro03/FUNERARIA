import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from 'src/app/models/incident.model';
import { IncidentService } from 'src/app/services/incident.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  incident:Incident;
  theFormGroup: FormGroup;
  trySend:boolean;

  constructor(private activateRoute: ActivatedRoute, 
              private service:IncidentService,
              private router:Router,
              private theFormBuilder:FormBuilder) { 
  
    this.trySend = false;
    this.mode = 1;
    this.incident={
      id:0,
      date_decease: null,
      place_decease: "",
      cause_decease: ""
    }
    this.configFormGroup();
  }

  //FormBuilder: sirve para crear un grupo de reglas, clase para definir las reglas

  //Instancia del FormBuilder, sirve para usar las reglas.

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      //Primer elemento del vector, valor por defecto
      //Lista seran las reglas
      date_decease: ['', [Validators.required]],
      place_decease: ['', [Validators.required]],
      cause_decease: ['', [Validators.required]]
    });
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls;
  }

  /*
  getTheaterData(){
    this.theater.capacity = this.getTheFormGroup.capacity.value;
    this.theater.location = this.getTheFormGroup.location.value;
  }*/

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");

    if(currentUrl.includes('view')){
      this.mode = 1;
    }else if(currentUrl.includes('create')){
      this.mode = 2;
    }else if(currentUrl.includes('update')){
      this.mode = 3;
    }
    
    if(this.activateRoute.snapshot.params.id){
      this.incident.id = this.activateRoute.snapshot.params.id;
      this.getIncident(this.incident.id);
    }
  }

  getIncident(id:number){
    this.service.view(id).subscribe(data=>{
      this.incident = data;

      this.theFormGroup.patchValue({
        date_decease: this.incident.date_decease,
        place_decease: this.incident.place_decease,
        cause_decease: this.incident.cause_decease
      })
    })    
  }

  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.create(this.incident).subscribe(data=>{
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["incidents/list"]);
    });
  }

  update(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.incident).subscribe(data=>{
      Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
      this.router.navigate(["incidents/list"]);
    });

  }
 }
