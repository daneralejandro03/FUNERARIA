import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { Transfer } from 'src/app/models/transfer.model';
import { ServiceService } from 'src/app/services/service.service';
import { TransferService } from 'src/app/services/transfer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  transfers:Transfer[];
  serviceEntity:Service;

  constructor(private service:TransferService, 
              private router:Router,
              private serviceService: ServiceService) { 
    this.transfers=[];

    this.serviceEntity = {
      id: 0,
      type: "",
      start_date: null,
      end_date: null
    }
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data=>{
      this.transfers = data;
    });
  }

  view(id:number){
    this.router.navigate(["transfers/view/"+id])
  }

  create(){
    this.router.navigate(["transfers/create"])
  }

  update(id:number){
    this.router.navigate(["transfers/update/"+id])
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
          let service_id = data.service_id;
          console.log("ServiceId: " + service_id);
          
          this.service.delete(id).
          subscribe(data => {
            
            this.serviceService.delete(service_id).subscribe(data=>{
              Swal.fire(
                'Eliminado!',
                'El registro ha sido eliminada correctamente',
                'success'
              )
            })
          
          this.ngOnInit();
          });
        })
        
      }
      })
  }

}
