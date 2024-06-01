import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update 
  notification:Notification;
  theFormGroup: FormGroup;
  trySend:boolean;
  serviceId: number;

  constructor(private activateRoute: ActivatedRoute,
    private service: NotificationService,
    private router: Router,
    private theFormBuilder: FormBuilder) { 
    
      this.trySend = false;
      this.mode = 1;
      this.notification={
        id: 0,
        message: "",
        date_shipped: null,
        service_id: null
      }

      this.configFormGroup();
}

configFormGroup(){
  this.theFormGroup = this.theFormBuilder.group({
//Primer elemento del vector, valor por defecto
//Lista seran las reglas
  message: ['',[Validators.required]],
  date_shipped: ['', [Validators.required]],
  service_id: [''],
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
  this.serviceId = this.activateRoute.snapshot.params['serviceId'];

  }else if(currentUrl.includes('update')){
  this.mode = 3;
  }

  if(this.activateRoute.snapshot.params.id){
  this.notification.id = this.activateRoute.snapshot.params.id;
  this.getNotification(this.notification.id);
  }
}

getNotification(id: number) {
  this.service.view(id).subscribe(data => {
      this.notification = data;

      this.theFormGroup.patchValue({
          message: this.notification.message,
          date_shipped: this.notification.date_shipped,
          service_id: this.notification.service_id,
      });

      this.serviceId = this.notification.service_id;

  });
}

create() {

  this.notification.service_id = this.serviceId;

  if (this.theFormGroup.invalid) {
    this.trySend = true;
    Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
    return;
  }

  this.service.create(this.notification).subscribe(data => {
    Swal.fire("Creación Exitosa", "Se ha creado un nuevo registro", "success");
    this.router.navigate(["notifications/list/"], { queryParams: { serviceId: this.serviceId } });
  });
}

update() {
  if (this.theFormGroup.invalid) {
    this.trySend = true;
    Swal.fire("Formulario incompleto.", "Ingrese correctamente los datos solicitados", "error");
    return;
  }

  this.notification.service_id = this.serviceId;
  
  this.service.update(this.notification).subscribe(data => {
    Swal.fire("Actualización Exitosa", "Se ha actualizado un nuevo registro", "success");
    this.router.navigate(["notifications/list"], { queryParams: { serviceId: this.serviceId} });
  });
}

}
