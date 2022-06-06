import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../models/user/user-data';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  password: string ;
  pwd1: string ;
  userModel:UserData = new UserData('','','','','','','','','','','','','','','','','');
  errorMessage: string;
  myForm: any;
  errorMessageMail:string;
  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }
  showPassword(password: any,passwordConfirm: any): any {
    //alert(this.pwd1);
    password.type = password.type === 'password' ?  'text' : 'password';
    passwordConfirm.type = passwordConfirm.type === 'password' ?  'text' : 'password';
   }
   blurEvent():any{
     //alert(this.userModel.password);
     //alert(this.pwd1);
     if (this.userModel.password==this.pwd1) {
      this.errorMessage = "";
     } else {
          this.errorMessage = "passwords not matched";
  
     }
   }
   signup() {
    //this.authService.findAllUsers()
   this.authService.register(this.userModel).subscribe(data => {
     //alert(this.userModel.firstName);
     this.router.navigate(['/login']);
   }, err => {
     this.errorMessageMail = "email already exist";
   });
 }
}
