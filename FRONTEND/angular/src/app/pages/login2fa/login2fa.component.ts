import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/app/models/session.model';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login2fa',
  templateUrl: './login2fa.component.html',
  styleUrls: ['./login2fa.component.scss']
})
export class Login2faComponent implements OnInit {

  theUser: User;
  session: Session;
  email = "";
  user_id = "";

  constructor(private theSecurityService: SecurityService,
              private router: Router,
              private route: ActivatedRoute) {
      this.session ={
        token2FA: 0,
        user_id: ""
      }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.email = params['email'];
    })
  }

  login2fa(){
    this.theSecurityService.getUserId(this.email).subscribe({
      next: (data) => {
        this.user_id = data.user_id;
        this.session.user_id = this.user_id;
        console.log("Session: " + JSON.stringify(this.session));
        
        
        this.theSecurityService.login2FA(this.session).subscribe({
          next: (data) => {
            console.log(`Respuesta desde ms_security ${JSON.stringify(data)}`);
            this.theSecurityService.saveSession(data);
            this.router.navigate(["dashboard"]);
          },
          error: (error) => {
            if(error.status === 401){
              Swal.fire("Error Autenticación", "Token Invalido", "error");
            }
          }
        })
      },
      error: (error) => {
        // Maneja cualquier error que pueda ocurrir al obtener el ID del usuario
      }
    });
  }
  
  
  

}
