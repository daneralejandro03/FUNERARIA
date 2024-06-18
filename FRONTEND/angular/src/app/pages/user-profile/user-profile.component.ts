import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  email: string;
  password: string;
  newPassword: string;

  constructor(private router: Router, private theSecurityService: SecurityService) { }

  ngOnInit() {
  }

  changePassword(){
    this.theSecurityService.changePassword(this.email, this.password, this.newPassword).subscribe(data =>{
      
      if(data){
        Swal.fire("Cambio de Contraseña Exitoso", "Se ha cambiado la contraseña", "success");
        this.router.navigateByUrl('/dashboard');
      }
      
    })

  }

}
