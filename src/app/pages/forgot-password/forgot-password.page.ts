import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Email } from 'src/app/models/email';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  errorMessageMail: string;
  Messages: string;
  urlChange: string;
  userEmail: Email;
  keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  errorMessage: string = "";
  chip1: any;
  chip2: any;
  first: any;
  second: any;
  third: any;
  fourth: any;
  fifth: any;
  sixth: any;
  beenchecked: boolean = false;
  ionicForm: FormGroup;
  errorMessagere: string;
  user: User = new User();
  constructor(public formBuilder: FormBuilder,
    private router: Router, private authService: AuthService, public toastController: ToastController) { }

  ngOnInit() {
    this.urlChange = 'first';
    this.userEmail = new Email();
    this.userEmail.email = this.user.email;
    this.userEmail.message = "Bonjour,\n Votre OTP est:";
    this.userEmail.subject = "Verification de l'OTP";

    this.ionicForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    })
  }

  passwordSend() {
    //this.authService.findAllUsers()
    this.chip1 = document.getElementById("chip1");
    let spinner = document.getElementById('spinnerEnvoyer');
    document.getElementById("EnvoyerButton").setAttribute("disabled", "true");
    let obtenirEnvoyerLabel = document.getElementById('obtenirEnvoyerLabel');
    obtenirEnvoyerLabel.style.display = "none";
    spinner.style.display = "block";
    this.authService.findByEmailpost(this.user.email).subscribe(data => {

      this.sendOTP();

    }, err => {
      this.errorMessageMail = "email incorrect";
      this.chip1.style.display = "block";
      spinner.style.display = "none";
      document.getElementById("EnvoyerButton").removeAttribute("disabled");
      obtenirEnvoyerLabel.style.display = "block";
      //this.errorMessageMail="email incorrect";
    });
  }
  ionChange() {
    this.chip1 = document.getElementById("chip1");
    //this.chip2=document.getElementById("chip2");
    this.closeChip1();

  }


  sendOTP() {
    this.userEmail.email = this.user.email;
    this.userEmail.message = "Bonjour,\n Votre OTP est:";
    this.userEmail.subject = "Verification de l'OTP";

    //alert(this.userEmail);
    this.authService.sendOTP(this.userEmail).subscribe(data => {
      this.urlChange = 'verifyotp';
      if (data.status == 200) {
        this.urlChange = 'verifyotp';
      }
    },
      err => {
        //err;
        //console.log(err);
        //console.log(err.status);
        if (err.status == 200) {
          this.urlChange = 'verifyotp';
        }

      });
  }


  keytab(event, keyEvent: KeyboardEvent) {
    let value: string = event.target.value;
    if (keyEvent.key === 'Backspace' || keyEvent.key === 'Delete') {
      document.getElementById("verify").setAttribute("disabled", "disabled");
    }
    if (value.length == 1) {
      if (!parseInt(value) && value != "0") {
        let element = event.srcElement;
        element.value = "";
      }
      else {
        let element = event.srcElement.nextElementSibling;
        let pressedKey = keyEvent.key;
        for (let key in this.keys) {
          if (pressedKey == key) {
            var countInsert = 0;
            var inputs = event.srcElement.parentElement.children;
            for (var i = 0; i < inputs.length; i++) {
              if (inputs[i].value.length == 1)
                countInsert++;
              else
                countInsert--;
            }
            if (countInsert == 6)
              document.getElementById("verify").removeAttribute("disabled");
            else
              document.getElementById("verify").setAttribute("disabled", "disabled");
            if (element == null)
              return;
            else
              element.focus();
          }
        }
      }
    }

  }


  sendOtpAgain() {
    //console.log(this.authService.userEmail.email);
    this.userEmail.email = this.user.email;
    this.userEmail.message = "Bonjour,\n Votre OTP est:";
    this.userEmail.subject = "Verification de l'OTP";


    this.authService.sendOTP(this.userEmail).subscribe(response => {
      if (response.status == 200) {
        //alert( this.otp.first);
        document.getElementById("otpSent").innerHTML = '<ion-icon name="checkmark" style="color:green;"></ion-icon>';
      }
      else {
        //alert( this.otp.first);
        document.getElementById("otpSent").innerHTML = '<ion-icon name="close" style="color:red;"></ion-icon>';
      }
    },
      err => {
        if (err.status == 200) {
          //alert( this.otp.first);
          document.getElementById("otpSent").innerHTML = '<ion-icon name="checkmark" style="color:green;"></ion-icon>';
        }
        else {
          //alert( this.otp.first);
          document.getElementById("otpSent").innerHTML = '<ion-icon name="close" style="color:red;"></ion-icon>';
        }
      });
  }

  verifyOTP(event) {
    this.chip2 = document.getElementById("chip2");
    // var otp=this.otp.first+this.otp.second+this.otp.third+this.otp.fourth+this.otp.fifth+this.otp.sixth;
    this.first = document.getElementById("first");
    this.second = document.getElementById("second");
    this.third = document.getElementById("third");
    this.fourth = document.getElementById("fourth");
    this.fifth = document.getElementById("fifth");
    this.sixth = document.getElementById("sixth");
    let spinner = document.getElementById('spinnerverify');
    document.getElementById("verify").setAttribute("disabled", "true");
    let obtenirverifyLabel = document.getElementById('obtenirverifyLabel');
    obtenirverifyLabel.style.display = "none";
    spinner.style.display = "block";
    var otp = this.first.value + this.second.value + this.third.value + this.fourth.value + this.fifth.value + this.sixth.value;
    var result = this.authService.verifyOTP(parseInt(otp), this.user.email).subscribe(response => {
      if (response.status == 200) {
        // this.urlChange = 'password';
        localStorage.setItem('changePasswordEmail', this.user.email);
        this.router.navigate(['/change-password']);
      }
      if (response.status == 400) {
        spinner.style.display = "none";
        document.getElementById("verify").removeAttribute("disabled");
        obtenirverifyLabel.style.display = "block";
        this.chip2.style.display = "block";
        this.errorMessage = "OTP n'est pas correct!";
      }
    }, err => {
      if (err.status == 200) {
        // this.urlChange = 'password';
        localStorage.setItem('changePasswordEmail', this.user.email);
        this.router.navigate(['/change-password']);
      }
      if (err.status == 400) {
        this.chip2.style.display = "block";
        this.errorMessage = "OTP n'est pas correct!";
        spinner.style.display = "none";
        document.getElementById("verify").removeAttribute("disabled");
        obtenirverifyLabel.style.display = "block";
        this.chip2.style.display = "block";
      }
    });
  }

  closeChip1() {
    this.chip1.style.display = "none";
    //this.chip2.style.display="none";
  }

  closeChip2() {
    // this.chip1.style.display="none";
    this.chip2.style.display = "none";
  }



  name1 = "eye-outline";
  name2 = "eye-off-outline";
  showPassword(eye: any, password: any): any {
    //<ion-icon name="eye-off-outline"></ion-icon>

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
    //alert("AFS");
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (password.value.length >= 8) {
      checkLen.checked = "true";
      this.beenchecked = true;
      //alert("fdssd");
    } else {
      checkLen.checked = "false";
      //this.beenchecked=false;
    }

    if (specialChars.test(password.value)) {
      checkSym.checked = "true";
      this.beenchecked = true;
      //alert("sym");
    } else {
      checkSym.checked = "false";
      //this.beenchecked=false;
    }

    if (/\d/.test(password.value)) {
      checkNom.checked = "true";
      //checkNom.style="--border-color-checked:#855fa0;--checkmark-color:#855fa0";
      //alert("number");
      this.beenchecked = true;
    } else {
      checkNom.checked = "false";
      //this.beenchecked=false;
    }
  }

  OK(password: any, checkLen: any, checkSym: any, checkNom: any): any {
    if (password.value.length == 0) { this.errorMessagere = "Mot De Passe est requis."; }
    else {
      if (checkLen.checked == true && checkSym.checked == true && checkNom.checked == true) {
        //alert(this.authServices.userEmail.email);
        let spinner = document.getElementById('spinnerOk');
        document.getElementById("okButton").setAttribute("disabled", "true");
        let obtenirOkLabel = document.getElementById('obtenirOkLabel');
        obtenirOkLabel.style.display = "none";
        spinner.style.display = "block";
        //this.user=localStorage.getItem("user");
        this.authService.changePassword(this.user).subscribe(data => {
          this.presentToast('Modification effectuée.', 'success');
          //alert("the password has chenged");
          // if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
          //   localStorage.setItem("url","okUppass");
          this.router.navigateByUrl('login');
          //this.router.navigate(['/decision/okUppass']);
        }
          , err => {

            this.presentToast('Modification échouée.', 'danger');
            spinner.style.display = "none";
            document.getElementById("okButton").removeAttribute("disabled");
            obtenirOkLabel.style.display = "block";
            this.chip2.style.display = "block";
            // if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
            // localStorage.setItem("url","opsUppass");
            //this.router.navigateByUrl('decision');
            //this.router.navigate(['/decision/opsUppass']);
          });

      }
      //else alert("error");
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: color
    });
    toast.present();
  }
}
