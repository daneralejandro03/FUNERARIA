import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string;
  password: string;
  theUser: User;

  constructor(private theSecurityService: SecurityService,
              private router: Router) {
      this.theUser = {
        email: "",
        password: ""
      }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login(){
    this.theSecurityService.login(this.theUser).subscribe({
      next: (data) => {
        console.log(`Respuesta desde ms_security ${JSON.stringify(data)}`);
        //this.theSecurityService.saveSession(data);
        this.router.navigate(["login2fa"], {queryParams: {email: this.theUser.email}});
      },
      error: (error) => {
        if(error.status === 401){
          Swal.fire("Error Autenticación", "Usuario o Contraseña invalidos", "error");
        }
      }
      
    })
  }

}
