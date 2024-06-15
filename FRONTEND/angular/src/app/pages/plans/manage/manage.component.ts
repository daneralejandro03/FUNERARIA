import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  plan:Plan;
  theFormGroup: FormGroup;
  trySend:boolean;

  constructor(private activateRoute: ActivatedRoute, 
              private service:PlanService,
              private router:Router,
              private theFormBuilder:FormBuilder) { 
  
    this.trySend = false;
    this.mode = 1;
    this.plan={
      id:0,
      description: "",
      price: 0,
      duration: 0
    }
    this.configFormGroup();
  }

  //FormBuilder: sirve para crear un grupo de reglas, clase para definir las reglas

  //Instancia del FormBuilder, sirve para usar las reglas.

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      //Primer elemento del vector, valor por defecto
      //Lista seran las reglas
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(10000), Validators.max(100000)]],
      duration: ['', [Validators.required, Validators.min(3), Validators.max(12)]]
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
      this.plan.id = this.activateRoute.snapshot.params.id;
      this.getPlan(this.plan.id);
    }
  }

  getPlan(id:number){
    this.service.view(id).subscribe(data=>{
      this.plan = data;
      console.log("Teatro: " + JSON.stringify(this.plan))
    })    
  }

  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.create(this.plan).subscribe(data=>{
      Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
      this.router.navigate(["plans/list"]);
    });
  }

  update(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }
    this.service.update(this.plan).subscribe(data=>{
      Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
      this.router.navigate(["plans/list"]);
    });
  }

}
