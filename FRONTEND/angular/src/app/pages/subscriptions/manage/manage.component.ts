import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription.model';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  subscription:Subscription;
  theFormGroup: FormGroup;
  trySend:boolean;

  constructor(private activateRoute: ActivatedRoute,
    private service: SubscriptionService,
    private router: Router,
    private theFormBuilder: FormBuilder) { 
    
      this.trySend = false;
      this.mode = 1;
      this.subscription={
        id: 0,
        subscription_type: "",
        startDate: null,
        endDate: null,
        state: null,
      }

      this.configFormGroup();
}

configFormGroup(){
  this.theFormGroup = this.theFormBuilder.group({
//Primer elemento del vector, valor por defecto
//Lista seran las reglas
  identificationCard: ['',[Validators.required]],
  name: ['', [Validators.required, Validators.minLength(3)]]
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
  this.subscription.id = this.activateRoute.snapshot.params.id;
  this.getSubscription(this.subscription.id);
  }
}

getSubscription(id:number){
  this.service.view(id).subscribe(data=>{
    this.subscription = data;
    console.log("Subscription: " + JSON.stringify(this.subscription))
  })    
}

create(){
  if(this.theFormGroup.invalid){
    this.trySend = true;
    Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
    return;
  }
  this.service.create(this.subscription).subscribe(data=>{
    Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
    this.router.navigate(["beneficiaries/list"]);
  });
}

update(){
  if(this.theFormGroup.invalid){
    this.trySend = true;
    Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
    return;
  }
  this.service.update(this.subscription).subscribe(data=>{
    Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
    this.router.navigate(["beneficiaries/list"]);
  });
 }
}
