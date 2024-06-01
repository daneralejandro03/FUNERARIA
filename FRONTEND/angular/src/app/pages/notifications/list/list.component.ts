import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  notifications: Notification[];
  notificationsAux: Notification[];
  serviceEntity: number;

  constructor(private service:NotificationService, 
              private router:Router, 
              private route: ActivatedRoute,
              private serviceService: ServiceService
            ) {
    this.notifications = [];
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let serviceId = params['serviceId'];
      this.list(serviceId);
    })
  }

  list(serviceId:number){
    this.serviceService.view(serviceId).subscribe(data=>{
      this.serviceEntity = serviceId;
          
      this.notifications = data["notifications"];
      this.notificationsAux = [];
  
      for(let notification of this.notifications){
        this.service.view(notification.id).subscribe(notificationData => {
          this.notificationsAux.push(notificationData);
        })
      }
    });
  }
  

  view(id:number){
    this.router.navigate(["notifications/view/"+id])
  }

  create(serviceId){
    this.router.navigate(["notifications/create/"+serviceId])
  }

  update(id:number){
    this.router.navigate(["notifications/update/"+id])
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
