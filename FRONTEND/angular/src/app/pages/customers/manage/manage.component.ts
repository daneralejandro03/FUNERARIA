import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { User } from 'src/app/models/user.model';
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
  theCustomer: Customer;
  theUser: User;
  theFormGroup: FormGroup;
  trySend:boolean;

  constructor(private activateRoute: ActivatedRoute,
              private service: CustomerService,
              private serviceUser: UserService,
              private router: Router,
              private theFormBuilder: FormBuilder) { 

                this.trySend = false;
                this.mode = 1;
                this.theCustomer={
                  id: 0,
                  address: "",
                  phone_number: "",
                  user_id: ""
                }

                this.theUser = {
                  name: "",
                  email: "",
                  password: "",
                  identificationCard: ""
                }

                this.configFormGroup();

              }



  configFormGroup(){
    this.theFormGroup = this.theFormBuilder.group({
      //Primer elemento del vector, valor por defecto
      //Lista seran las reglas
      identificationCard: ['',[Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
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
      this.theCustomer.id = this.activateRoute.snapshot.params.id;
      this.getCustomer(this.theCustomer.id);
    }
  }

  getCustomer(id:number){

    this.service.view(id).subscribe(data=>{
      this.theCustomer = data;

      this.serviceUser.view(this.theCustomer.user_id).subscribe(data=>{
        this.theUser = data;
      })

      console.log("Owner: " + JSON.stringify(this.theCustomer))
    })    
  }

  create(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    this.serviceUser.create(this.theUser).subscribe(data=>{
      if(data){
        this.theCustomer.user_id = data._id;
        console.log(data._id);

        this.theCustomer.user_id = data._id;
        this.service.create(this.theCustomer).subscribe(data=>{
          Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
          this.router.navigate(["customers/list"]);
        });

      }
    })
  }

  update(){
    if(this.theFormGroup.invalid){
      this.trySend = true;
      Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
      return;
    }

    
    this.serviceUser.update(this.theUser).subscribe(data=>{
      this.service.update(this.theCustomer).subscribe(data=>{
      
        Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
        
        this.router.navigate(["customers/list"]);
      });
    });
  }

}
