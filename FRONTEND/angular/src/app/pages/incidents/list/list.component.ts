import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from 'src/app/models/incident.model';
import { IncidentService } from 'src/app/services/incident.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  incidents:Incident[];

  constructor(private service:IncidentService, private router:Router) { 
    this.incidents=[];
  }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.service.list().subscribe(data=>{
      this.incidents = data;
    });
  }

  view(id:number){
    this.router.navigate(["incidents/view/"+id])
  }

  create(){
    this.router.navigate(["incidents/create"])
  }

  update(id:number){
    this.router.navigate(["incidents/update/"+id])
  }

  listReports(id:number){
    this.router.navigate(["reports/list/"], { queryParams: { incidentId: id, type: 2 } })
  }

  listComments(id:number){
    this.router.navigate(["comments/list/"], { queryParams: { incidentId: id } })
  }

  listExecutionServices(id:number){
    this.router.navigate(["executionservices/list/"], { queryParams: { incidentId: id, type: 2 } })
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
