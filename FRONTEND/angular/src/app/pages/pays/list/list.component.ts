import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pay } from 'src/app/models/pay.model';
import { PayService } from 'src/app/services/pay.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pays: Pay[];
  paysAux: Pay[];
  subscription: number;

  constructor(private service:PayService, 
              private router:Router, 
              private route: ActivatedRoute,
              private subscriptionService: SubscriptionService
            ) {
    this.pays = [];
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let subscription_id = params['subscription_id'];
      this.list(subscription_id);
    })
  }

  list(subscription_id:number){
    this.subscriptionService.view(subscription_id).subscribe(data=>{
      this.subscription = subscription_id;
      console.log(data);
      
      this.pays = data["pays"];
      this.paysAux = [];
  
      for(let pay of this.pays){
        this.service.view(pay.id).subscribe(pay_data => {
          this.paysAux.push(pay_data);
        })
      }
  
      console.log(JSON.stringify(this.pays));
    });
  }
  

  view(id:number){
    this.router.navigate(["pays/view/"+id])
  }

  create(subscription_id){
    //console.log(`Id del user: ${customer}`);
    
    this.router.navigate(["pays/create/"+subscription_id])
  }

  update(id:number){
    this.router.navigate(["pays/update/"+id])
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
