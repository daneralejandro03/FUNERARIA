import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { IncidentService } from 'src/app/services/incident.service';
import { Comment } from 'src/app/models/comment.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  comments: Comment[];
  commentsAux: Comment[];
  incident_id: number;

  constructor(private service:CommentService, 
              private router:Router, 
              private route: ActivatedRoute,
              private incidentService: IncidentService
            ) {
    this.comments = [];
    this.incident_id = null;
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let incidentId = params['incidentId'];   
      this.list(incidentId);
    })
  }

  list(incidentId:number){  
    this.incidentService.view(incidentId).subscribe(data=>{
      this.incident_id = incidentId;
       
      this.comments = data["comments"];
      this.commentsAux = [];
  
      for(let comment of this.comments){
        this.service.view(comment.id).subscribe(commentData => {
          this.commentsAux.push(commentData);
        })
      }
    });
  }
  

  view(id:number){
    this.router.navigate(["comments/view/"+id])
  }

  create(incidentId:number){
    this.router.navigate(["comments/create/"+incidentId])
  }

  update(id:number){
    this.router.navigate(["comments/update/"+id])
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
