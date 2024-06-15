import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  comment:Comment;
  theFormGroup: FormGroup;
  trySend:boolean;
  incidentId: number;

  constructor(private activateRoute: ActivatedRoute,
    private service: CommentService,
    private router: Router,
    private theFormBuilder: FormBuilder) { 
    
      this.trySend = false;
      this.mode = 1;
      this.comment={
        id: 0,
        message: "",
        send_date: null,
        incident_id: null
      }

      this.configFormGroup();
}

configFormGroup(){
  this.theFormGroup = this.theFormBuilder.group({
//Primer elemento del vector, valor por defecto
//Lista seran las reglas
  message: ['',[Validators.required]],
  send_date: ['', [Validators.required]],
  incident_id: [''],
  });
}

get getTheFormGroup(){
  return this.theFormGroup.controls;
}

/*
getTheaterData(){
this.theater.capacity = this.getTheFormGroup.capacity.value;
this.theater.location = this.getTheFormGroup.location.value;
}*/

ngOnInit(): void {

  const currentUrl = this.activateRoute.snapshot.url.join("/");

  if(currentUrl.includes('view')){
  this.mode = 1;
  }else if(currentUrl.includes('create')){
  this.mode = 2;
  this.incidentId = this.activateRoute.snapshot.params['incidentId'];

  }else if(currentUrl.includes('update')){
  this.mode = 3;
  }

  if(this.activateRoute.snapshot.params.id){
  this.comment.id = this.activateRoute.snapshot.params.id;
  this.getComment(this.comment.id);
  }
}

getComment(id: number) {
  this.service.view(id).subscribe(data => {
      this.comment = data;

      this.theFormGroup.patchValue({
          message: this.comment.message,
          send_date: this.comment.send_date,
          incident_id: this.comment.incident_id,
      });

      this.incidentId = this.comment.incident_id;

  });
}

create() {

  this.comment.incident_id = this.incidentId;

  if (this.theFormGroup.invalid) {
    this.trySend = true;
    Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
    return;
  }

  this.service.create(this.comment).subscribe(data => {
    Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
    this.router.navigate(["comments/list/"], { queryParams: { incidentId: this.incidentId } });
  });
}

update() {
  if (this.theFormGroup.invalid) {
    this.trySend = true;
    Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
    return;
  }

  this.comment.incident_id = this.incidentId;
  
  this.service.update(this.comment).subscribe(data => {
    Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
    
    this.router.navigate(["comments/list"], { queryParams: { incidentId: this.incidentId} });
  });
}

}
