import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/models/administrator.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  administrators:Administrator[];
  adminAux:Administrator;

  constructor(private service:AdministratorService, 
              private router:Router,
              private userService:UserService) { 
    this.administrators=[];
    this.adminAux = {
      id: 0,
      privileges: "",
      user_id : "",
      responsabilities: ""
    }
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data=>{
      this.administrators = data;
    });
  }

  view(id:number){
    this.router.navigate(["administrators/view/"+id])
  }

  create(){
    this.router.navigate(["administrators/create"])
  }

  update(id:number){
    this.router.navigate(["administrators/update/"+id])
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
          this.adminAux = data;

          const user_id = this.adminAux.user_id;

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
