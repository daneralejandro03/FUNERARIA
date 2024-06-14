import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  serviceEntity:Service;
  theFormGroup: FormGroup;
  trySend:boolean;

  constructor(private activateRoute: ActivatedRoute, 
              private service:ServiceService,
              private router:Router,
              private theFormBuilder:FormBuilder) { 
  
    this.trySend = false;
    this.mode = 1;
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
      //Primer elemento del vector, valor por defecto
      //Lista seran las reglas
      type: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]]
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
      this.serviceEntity.id = this.activateRoute.snapshot.params.id;
      this.getService(this.serviceEntity.id);
    }
  }

  getService(id:number){
    this.service.view(id).subscribe(data=>{
      this.serviceEntity = data;

      this.theFormGroup.patchValue({
          type: this.serviceEntity.type,
          start_date: this.serviceEntity.start_date,
          end_date: this.serviceEntity.end_date,
      });

      console.log("Servicio: " + JSON.stringify(this.serviceEntity))
    })    
  }

  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    console.log("Servicio: " + JSON.stringify(this.serviceEntity));
    
    this.service.create(this.serviceEntity).subscribe(data=>{
      console.log('Entity:' + this.serviceEntity);
      
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["services/list"]);
    });
  }

  update(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.serviceEntity).subscribe(data=>{
      Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
      this.router.navigate(["services/list"]);
    });
  }

}
