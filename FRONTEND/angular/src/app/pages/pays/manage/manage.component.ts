import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pay } from 'src/app/models/pay.model';
import { PayService } from 'src/app/services/pay.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  pay:Pay;
  theFormGroup: FormGroup;
  trySend:boolean;
  subscription_id: number;

  constructor(private activateRoute: ActivatedRoute,
    private service: PayService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private theSubscriptionService: SubscriptionService) { 
    
      this.trySend = false;
      this.mode = 1;
      this.pay={
        id: 0,
        pay_day: null,
        amount: 0,
        subscription_id: 0
      }

      this.configFormGroup();
}

configFormGroup(){
  this.theFormGroup = this.theFormBuilder.group({
//Primer elemento del vector, valor por defecto
//Lista seran las reglas
  pay_day: ['',[Validators.required]],
  amount: ['', [Validators.required]]
  //customer_id: ['', [Validators.required]],
  //plan_id: ['', [Validators.required]]
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
  this.subscription_id = this.activateRoute.snapshot.params['subscription_id'];
    console.log(`Subscription ID: ${this.subscription_id}`);
  }else if(currentUrl.includes('update')){
  this.mode = 3;
  }

  if(this.activateRoute.snapshot.params.id){
  this.pay.id = this.activateRoute.snapshot.params.id;
  this.getPay(this.pay.id);
  }
}

getPay(id: number) {
  this.service.view(id).subscribe(data => {
      this.pay = data;

      // Asegurar que las fechas estén en formato YYYY-MM-dd
      const pay_day = this.formatDate(this.pay.pay_day);

      this.theFormGroup.patchValue({
          pay_day: pay_day,
          amount: this.pay.amount,
      });

      this.subscription_id = this.pay.subscription_id;

      console.log("Pay: " + JSON.stringify(this.pay));
  });
}



create() {
  console.log(`Subscription Id desde el componente de Pay: ${this.subscription_id}`);
  this.pay.subscription_id = this.subscription_id;

  if (this.theFormGroup.invalid) {
    this.trySend = true;
    Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
    return;
  }

  this.service.create(this.pay).subscribe(data => {
    Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
    this.router.navigate(["pays/list/"], { queryParams: { subscription_id: this.subscription_id } });
  });
}

update() {
  if (this.theFormGroup.invalid) {
    this.trySend = true;
    Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
    return;
  }

  this.pay.subscription_id = this.subscription_id;

  this.pay = { ...this.pay, ...this.theFormGroup.value };
  
  this.service.update(this.pay).subscribe(data => {
    Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
    this.router.navigate(["pays/list"], { queryParams: { subscription_id: this.subscription_id} });
  });
}

formatDate(date: Date | string | null): string | null {
  if (!date) {
      return null;
  }
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

}
