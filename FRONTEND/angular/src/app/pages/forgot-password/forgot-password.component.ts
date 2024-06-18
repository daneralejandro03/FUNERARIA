import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  constructor(private router: Router, 
              private secutiryService: SecurityService) { }

  ngOnInit(): void {
  }

  forgotPassword(){
    console.log("Email:" + this.email);
    
    this.secutiryService.forgotPassword(this.email).subscribe(data =>{
      console.log("Data: " + JSON.stringify(data));
      if(data){
        this.router.navigate(["reset-password"]);
      }
    });
  }

}
