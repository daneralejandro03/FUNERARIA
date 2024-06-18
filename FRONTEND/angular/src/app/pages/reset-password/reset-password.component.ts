import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  newPassword: string;

  constructor(private router: Router, private theSecutiryService: SecurityService) { }

  ngOnInit(): void {

  }

  resetPassword(){
    console.log("token: " + this.token);
    console.log("newPassword: " + this.newPassword);
    this.theSecutiryService.resetPassword(this.token, this.newPassword).subscribe(data=>{
      this.router.navigate(["login"])
    })
    
  }

}
