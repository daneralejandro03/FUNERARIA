import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/models/beneficiary.model';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import { OwnerService } from 'src/app/services/owner.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  beneficiaries: Beneficiary[];
  beneficiaryAux: Beneficiary[];
  owner: number;

  constructor(private service:BeneficiaryService, 
              private router:Router, 
              private route: ActivatedRoute,
              private ownerService: OwnerService,
              private customerService: CustomerService,
              private userService: UserService
            ) {
    this.beneficiaries = [];
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let ownerId = params['ownerId'];
      this.list(ownerId);
    })
  }

  list(ownerId:number){
    this.ownerService.view(ownerId).subscribe(data=>{
      this.owner = ownerId;
      this.beneficiaries = data["beneficiaries"];
      this.beneficiaryAux = [];
  
      for(let beneficiary of this.beneficiaries){
        this.service.view(beneficiary.id).subscribe(beneficiaryData => {
          this.beneficiaryAux.push(beneficiaryData);
        })
      }
  
      console.log(JSON.stringify(this.beneficiaries));
    });
  }
  

  view(id:number){
    this.router.navigate(["beneficiaries/view/"+id])
  }

  create(ownerId:number){
    this.router.navigate(["beneficiaries/create/"+ownerId])
  }

  update(id:number){
    this.router.navigate(["beneficiaries/update/"+id])
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
            let customer_id = data["customer"]["id"];
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
