import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { Transfer } from 'src/app/models/transfer.model';
import { ServiceService } from 'src/app/services/service.service';
import { TransferService } from 'src/app/services/transfer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  transfer:Transfer;
  theFormGroup: FormGroup;
  trySend:boolean;
  serviceEntity:Service

  constructor(private activateRoute: ActivatedRoute, 
              private service:TransferService,
              private router:Router,
              private theFormBuilder:FormBuilder,
              private serviceService:ServiceService) { 
  
    this.trySend = false;
    this.mode = 1;
    this.transfer={
      id:0,
      place_origin: "",
      destination: "",
      distance: 0,
      type_vehicle: "",
      service_id: null
    }
    this.serviceEntity={
      id:0,
      type: "",
      start_date: null,
      end_date: null
    }
    this.configFormGroup();
  }

  //FormBuilder: sirve para crear un grupo de reglas, clase para definir las reglas

  //Instancia del FormBuilder, sirve para usar las reglas.

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      
      type: ['', [Validators.required, Validators.minLength(5)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      place_origin: ['', [Validators.required, Validators.minLength(5)]],
      destination: ['', [Validators.required, Validators.minLength(5)]],
      distance: ['', [Validators.required]],
      type_vehicle: ['', [Validators.required, Validators.minLength(5)]],
      service_id: ['']
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
      this.transfer.id = this.activateRoute.snapshot.params.id;
      this.getTransfer(this.transfer.id);
    }
  }

  getTransfer(id:number){
    this.service.view(id).subscribe(data=>{
      this.transfer = data;

      this.serviceService.view(data.service_id).subscribe(data=>{

        this.serviceEntity = data;

        this.theFormGroup.patchValue({
          type: this.serviceEntity.type,
          start_date: this.serviceEntity.start_date,
          end_date: this.serviceEntity.end_date,
          place_origin: this.transfer.place_origin,
          destination: this.transfer.destination,
          distance: this.transfer.distance,
          type_vehicle: this.transfer.type_vehicle,
          service_id: this.transfer.service_id
        })
      })
    })    
  }

  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    this.serviceService.create(this.serviceEntity).subscribe(data=>{

      this.transfer.service_id = data.id;

      this.service.create(this.transfer).subscribe(data=>{
        Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
        this.router.navigate(["transfers/list"]);
      });
    })
    
  }

  update(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    this.serviceService.update(this.serviceEntity).subscribe(data=>{
      this.service.update(this.transfer).subscribe(data=>{
        Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
        this.router.navigate(["transfers/list"]);
      })
    });
  }

}
