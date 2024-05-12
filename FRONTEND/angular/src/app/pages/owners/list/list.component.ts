import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/models/beneficiary.model';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  owners:Owner[];

  constructor(private service:OwnerService, private router:Router) { 
    this.owners=[];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data=>{
      this.owners = data;
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
    console.log(id);

    this.router.navigate(["beneficiaries/list/"], { queryParams: { ownerId: id } })
    
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
