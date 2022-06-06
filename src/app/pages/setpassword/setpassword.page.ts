import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credit } from 'src/app/models/credit/credit';
import { UserData } from 'src/app/models/user/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { CamundaBPMService } from 'src/app/services/camunda-bpm.service';
import { CreditServices } from 'src/app/services/credit-services';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.page.html',
  styleUrls: ['./setpassword.page.scss'],
})
export class SetpasswordPage implements OnInit {

  beenchecked: boolean = false;
  userModel: UserData=new UserData('','','','','','','','','','','','','','','','','');
  ionicForm: FormGroup;
  errorMessage:string;
  name1="eye-outline";
  name2="eye-off-outline";

  credit:Credit;
  constructor(public formBuilder: FormBuilder,
    private camundaServices:CamundaBPMService,
    private creditservice:CreditServices,
    private router: Router, private authServices: AuthService) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(8)]]
    })
  }

  showPassword(eye: any,password:any):any{
    if(eye.name==this.name1)
      {
        eye.name=this.name2;
        password.type ="text";
      }
    else  {
      eye.name=this.name1;
      password.type ="password";
    }
  }
  
  onChangeTime(password:any,checkLen:any,checkSym :any,checkNom:any):any {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(password.value.length>=8)
     {
      checkLen.checked="true";
      this.beenchecked=true;
     }else{
      checkLen.checked="false";
     }

     if(specialChars.test(password.value))
     {
      checkSym.checked="true";
      this.beenchecked=true;
     }
     else{
      checkSym.checked="false";
     }
     if(/\d/.test(password.value))
     {
      checkNom.checked="true";
      this.beenchecked=true;
     }else{
      checkNom.checked="false";
     }
  }

  OK(password:any,checkLen:any, checkSym:any, checkNom:any):any{
    if(password.value.length==0) this.errorMessage="Mot De Passe est requis."
    else{
      
      if(checkLen.checked==true && checkSym.checked==true && checkNom.checked==true){
        let spinner=document.getElementById('spinner');
        document.getElementById("sendButton").setAttribute("disabled","true");
        let obtenirOtpLabel=document.getElementById('obtenirOtpLabel');
        obtenirOtpLabel.style.display="none";
        spinner.style.display="block";
        this.authServices.createPassword((this.authServices.getUser().email),this.userModel.password).subscribe(
          data =>{
          this.creditservice.getoneByemail(this.authServices.getUser().email).subscribe(
            d =>{
              this.credit=d;
              //taskId:string,id:number
              this.camundaServices.completeTaskOTP(this.credit.taskId,this.credit.id).subscribe(
              ass=>{
                this.router.navigate(['/ocrhome']);
              },
              lay=>{
                spinner.style.display="none";
                document.getElementById("sendButton").removeAttribute("disabled");
                obtenirOtpLabel.style.display="block";
                //console.error(lay);
              })
            },
            e =>{}
          )
          
          
          
          
        },err =>{
          
          //alert(err);
        })  
        
      }
     // else alert("error");
    }
  }
}