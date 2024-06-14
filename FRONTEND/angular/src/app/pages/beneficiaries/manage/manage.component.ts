import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiary } from 'src/app/models/beneficiary.model';
import { Customer } from 'src/app/models/customer.model';
import { User } from 'src/app/models/user.model';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  beneficiary:Beneficiary;
  customer:Customer;
  user: User;
  theFormGroup: FormGroup;
  trySend:boolean;
  owner_id:number;

  constructor(private activateRoute: ActivatedRoute,
    private service: BeneficiaryService,
    private customerService: CustomerService,
    private userService: UserService,
    private router: Router,
    private theFormBuilder: FormBuilder) { 
    
      this.trySend = false;
      this.mode = 1;
      this.beneficiary={
        id: 0,
        beneficiary_status: "",
        customer_id: null,
        owner_id: null
      }
      this.user = {
        name: "",
        identificationCard: "",
        email: "",
        password: ""
      }
      this.customer = {
        id: 0,
        address: "",
        phone_number: "",
        user_id: null
      }
      this.configFormGroup();
      this.owner_id = null;

}

configFormGroup(){
  this.theFormGroup = this.theFormBuilder.group({
      beneficiary_status: ['',[Validators.required, Validators.minLength(5)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      identificationCard: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone_number: ['', [Validators.required, Validators.minLength(5)]]
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
    this.owner_id = this.activateRoute.snapshot.params['ownerId'];
  this.mode = 2;
  }else if(currentUrl.includes('update')){
  this.mode = 3;
  }

  if(this.activateRoute.snapshot.params.id){
  this.beneficiary.id = this.activateRoute.snapshot.params.id;
  this.getBeneficiary(this.beneficiary.id);
  }
}

getBeneficiary(id:number){
  this.service.view(id).subscribe(data=>{
    this.beneficiary = data;

    let customer_id = data["customer"]["id"];
    
    this.customerService.view(customer_id).subscribe(data =>{

      this.customer = data;

      this.userService.view(this.customer.user_id).subscribe(data=>{
        this.user = data
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

  this.beneficiary.owner_id = this.owner_id;

  this.userService.create(this.user).subscribe(data=>{
    if(data){
      let user_id = data._id;
      this.customer.user_id = user_id;
  
      this.customerService.create(this.customer).subscribe(data=>{
        if(data){

          this.beneficiary.owner_id = this.owner_id;
          this.beneficiary.customer_id = data.id;
    
          this.service.create(this.beneficiary).subscribe(data=>{
            Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
            this.router.navigate(["beneficiaries/list"], { queryParams: { ownerId: this.owner_id } });
          });
        }
      })
    }
    
  })

  
}

update(){
  if(this.theFormGroup.invalid){
    this.trySend = true;
    Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
    return;
  }

  this.userService.update(this.user).subscribe(data=>{
    if(data){
      this.customerService.update(this.customer).subscribe(data=>{
        if(data){
          this.service.update(this.beneficiary).subscribe(data=>{
            this.owner_id = data.owner_id;
            Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
            this.router.navigate(["beneficiaries/list"], { queryParams: { ownerId: this.owner_id } });
          });
        }
      })
    }
  })
  
}

}
