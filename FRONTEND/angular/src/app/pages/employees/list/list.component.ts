import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  employees:Employee[];
  employeeAux:Employee;

  constructor(private service:EmployeeService, 
              private router:Router,
              private userService:UserService) { 
    this.employees=[];
    this.employeeAux = {
      id: 0,
      salary: 0,
      user_id : "",
      position: ""
    }
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data=>{
      this.employees = data;
    });
  }

  view(id:number){
    this.router.navigate(["employees/view/"+id])
  }

  create(){
    this.router.navigate(["employees/create"])
  }

  update(id:number){
    this.router.navigate(["employees/update/"+id])
  }

  delete(id:number){
    console.log("Eliminando a: " + id);
    Swal.fire({
        title: 'Eliminar',
        text: "Está seguro que quiere eliminar el registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
      if (result.isConfirmed) {
        

        this.service.view(id).subscribe(data=>{
          this.employeeAux = data;

          const user_id = this.employeeAux.user_id;

          this.service.delete(id).subscribe(data => {

            this.userService.delete(user_id).subscribe(data=>{
              Swal.fire(
                'Eliminado!',
                'El registro ha sido eliminada correctamente',
                'success'
            )
              this.ngOnInit();
              });
            })
        })
        
      }
      })
  }

}
