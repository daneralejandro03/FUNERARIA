import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  customers:Customer[];

  constructor(private service:CustomerService, private router:Router) { 
    this.customers=[];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data=>{
      this.customers = data;
    });
  }

  view(id:number){
    this.router.navigate(["customers/view/"+id])
  }

  create(){
    this.router.navigate(["customers/create"])
  }

  update(id:number){
    this.router.navigate(["customers/update/"+id])
  }

  listSubscriptions(id:number){
    console.log(id);

    this.router.navigate(["subscriptions/list/"], { queryParams: { customerId: id } })
    
    /*this.service.view(id).subscribe(data=>{
        console.log(data["beneficiaries"]);
    });*/
    
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
        this.service.delete(id).
        subscribe(data => {
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminada correctamente',
          'success'
      )
        this.ngOnInit();
        });
      }
      })
  }

}
