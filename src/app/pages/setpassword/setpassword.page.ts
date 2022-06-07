import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credit } from 'src/app/models/credit';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CamundaBPMService } from 'src/app/services/camunda-bpm.service';
import { CreditService } from 'src/app/services/credit.service';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.page.html',
  styleUrls: ['./setpassword.page.scss'],
})
export class SetpasswordPage implements OnInit {

  beenchecked: boolean = false;
  userModel: User = new User();
  ionicForm: FormGroup;
  errorMessage: string;
  name1 = "eye-outline";
  name2 = "eye-off-outline";

  credit: Credit;
  constructor(public formBuilder: FormBuilder,
    private camundaServices: CamundaBPMService,
    private creditservice: CreditService,
    private router: Router, private authServices: AuthService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  showPassword(eye: any, password: any): any {
    if (eye.name == this.name1) {
      eye.name = this.name2;
      password.type = "text";
    }
    else {
      eye.name = this.name1;
      password.type = "password";
    }
  }

  onChangeTime(password: any, checkLen: any, checkSym: any, checkNom: any): any {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (password.value.length >= 8) {
      checkLen.checked = "true";
      this.beenchecked = true;
    } else {
      checkLen.checked = "false";
    }

    if (specialChars.test(password.value)) {
      checkSym.checked = "true";
      this.beenchecked = true;
    }
    else {
      checkSym.checked = "false";
    }
    if (/\d/.test(password.value)) {
      checkNom.checked = "true";
      this.beenchecked = true;
    } else {
      checkNom.checked = "false";
    }
  }

  OK(password: any, checkLen: any, checkSym: any, checkNom: any): any {
    if (password.value.length == 0) this.errorMessage = "Mot De Passe est requis."
    else {

      if (checkLen.checked == true && checkSym.checked == true && checkNom.checked == true) {
        let spinner = document.getElementById('spinner');
        document.getElementById("sendButton").setAttribute("disabled", "true");
        let obtenirOtpLabel = document.getElementById('obtenirOtpLabel');
        obtenirOtpLabel.style.display = "none";
        spinner.style.display = "block";
        this.authServices.createPassword((this.authServices.getUser().email), this.userModel.password).subscribe(
          data => {
            localStorage.setItem('currentPassword', this.userModel.password);
            this.creditservice.getCreditByUser(this.authServices.getUser().email).subscribe(
              d => {
                this.credit = d;
                //taskId:string,id:number
                this.camundaServices.getTaskId(this.credit.user.id, this.credit.processInstanceId).subscribe(
                  data => {

                    this.camundaServices.completeTaskOTP(this.credit.user, this.credit.taskId).subscribe(
                      ass => {
                        console.log(ass);
                        this.router.navigate(['/ocrhome']);
                      },
                      lay => {
                        spinner.style.display = "none";
                        document.getElementById("sendButton").removeAttribute("disabled");
                        obtenirOtpLabel.style.display = "block";
                        //console.error(lay);
                      })
                  }
                );
              },
              e => { }
            )




          }, err => {

            //alert(err);
          })

      }
      // else alert("error");
    }
  }
}