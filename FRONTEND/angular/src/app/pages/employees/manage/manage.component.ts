import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { User } from 'src/app/models/user.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  theEmployee: Employee;
  theUser: User;
  theFormGroup: FormGroup;
  trySend:boolean;

  constructor(private activateRoute: ActivatedRoute,
              private service: EmployeeService,
              private serviceUser: UserService,
              private router: Router,
              private theFormBuilder: FormBuilder) { 

                this.trySend = false;
                this.mode = 1;
                this.theEmployee={
                  id: 0,
                  salary: 0,
                  position: "",
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
      position: ['', [Validators.required, Validators.minLength(3)]],
      salary: ['', [Validators.required, Validators.minLength(3)]],
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
      this.theEmployee.id = this.activateRoute.snapshot.params.id;
      this.getEmployee(this.theEmployee.id);
    }
  }

  getEmployee(id:number){

    this.service.view(id).subscribe(data=>{
      this.theEmployee = data;

      this.serviceUser.view(this.theEmployee.user_id).subscribe(data=>{
        this.theUser = data;
      })
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
        this.theEmployee.user_id = data._id;
        
        this.service.create(this.theEmployee).subscribe(data=>{
          Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
          this.router.navigate(["employees/list"]);
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
      this.service.update(this.theEmployee).subscribe(data=>{
      
        Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
        
        this.router.navigate(["employees/list"]);
      });
    });
  }

}
