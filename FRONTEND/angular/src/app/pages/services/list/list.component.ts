import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  services:Service[];

  constructor(private service:ServiceService, private router:Router) { 
    this.services=[];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data=>{
      this.services = data;
      console.log(JSON.stringify(this.services));
    });
  }

  view(id:number){
    this.router.navigate(["services/view/"+id])
  }

  create(){
    this.router.navigate(["services/create"])
  }

  update(id:number){
    this.router.navigate(["services/update/"+id])
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
