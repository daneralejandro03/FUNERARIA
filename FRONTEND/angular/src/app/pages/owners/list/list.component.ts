import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { CustomerService } from 'src/app/services/customer.service';
import { OwnerService } from 'src/app/services/owner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  owners:Owner[];

  constructor(private service:OwnerService, 
              private router:Router,
              private userService:UserService,
              private customerService:CustomerService) { 
    this.owners=[];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data=>{
      this.owners = data;
      console.log(JSON.stringify(this.owners));
      
    });
  }

  view(id:number){
    this.router.navigate(["owners/view/"+id])
  }

  create(){
    this.router.navigate(["owners/create"])
  }

  update(id:number){
    this.router.navigate(["owners/update/"+id])
  }

  listBeneficiaries(id:number){
    this.router.navigate(["beneficiaries/list/"], { queryParams: { ownerId: id } })
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
          let customer_id = data.customer_id;
          this.customerService.view(customer_id).subscribe(data=>{
            let user_id = data.user_id;

            this.service.delete(id).subscribe(data=>{
              this.customerService.delete(customer_id).subscribe(data=>{
                this.userService.delete(user_id).subscribe(data=>{
                  Swal.fire(
                    'Eliminado!',
                    'El registro ha sido eliminada correctamente',
                    'success'
                )
                  this.ngOnInit();
                })
              })
            })
          })
        }) 
      }
      })
  }

  
}
