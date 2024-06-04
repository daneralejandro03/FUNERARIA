import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { Owner } from 'src/app/models/owner.model';
import { User } from 'src/app/models/user.model';
import { CustomerService } from 'src/app/services/customer.service';
import { OwnerService } from 'src/app/services/owner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  user:User;
  customer:Customer;
  owner:Owner;  
  theFormGroup: FormGroup;
  trySend:boolean;

  constructor(private activateRoute: ActivatedRoute,
              private service: OwnerService,
              private userService: UserService,
              private customerService: CustomerService,
              private router: Router,
              private theFormBuilder: FormBuilder) { 
              
                this.trySend = false;
                this.mode = 1;
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
                this.owner={
                  id: 0,
                  contract_status: "",
                  customer_id: null,
                }

                this.configFormGroup();
  }

  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      //Primer elemento del vector, valor por defecto
      //Lista seran las reglas
      identificationCard: ['',[Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      user_id: [''],
      contract_status: ['', [Validators.required]],
      customer_id: ['']
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
      this.owner.id = this.activateRoute.snapshot.params.id;
      this.getOwner(this.owner.id);
    }
  }

  getOwner(id:number){
    this.service.view(id).subscribe(data=>{
      this.owner = data;

      this.customerService.view(this.owner.customer_id).subscribe(data =>{

        this.customer = data;

        this.userService.view(this.customer.user_id).subscribe(data=>{
          this.user = data
        })

      })
      console.log(JSON.stringify(data));
      
    })    
  }

  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    this.userService.create(this.user).subscribe(data=>{
      if(data){
        let user_id = data._id;
        this.customer.user_id = user_id;
  
        if(data){
          this.customerService.create(this.customer).subscribe(data=>{
  
            if(data){
              let customer_id = data.id;
              this.owner.customer_id = customer_id;
      
              this.service.create(this.owner).subscribe(data=>{
                Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
                this.router.navigate(["owners/list"]);
              })
            }
          })
        }
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
        let user_id = data._id;
        this.customer.user_id = user_id;
  
        if(data){
          this.customerService.update(this.customer).subscribe(data=>{
  
            if(data){
              let customer_id = data.id;
              this.owner.customer_id = customer_id;
      
              this.service.update(this.owner).subscribe(data=>{
                Swal.fire("Actualización Exitosa", "Se ha creado un nuevo registro", "success");
                this.router.navigate(["owners/list"]);
              })
            }
          })
        }
      }      
    })
  }

}
