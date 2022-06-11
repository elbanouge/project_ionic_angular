import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadService } from 'src/app/services/load.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOTPPage implements OnInit {
  keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  errorMessage: string = "";
  chip: any;
  first: any;
  second: any;
  third: any;
  fourth: any;
  fifth: any;
  sixth: any;
  constructor(private router: Router, private authService: AuthService, private loadService: LoadService) { }

  ngOnInit() {
    document.getElementById("verify").setAttribute("disabled", "disabled");
    this.chip = document.getElementById("chip");

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
    document.getElementById("otpSent").innerHTML = "";
    document.getElementById("resend").style.pointerEvents = "none";
    document.getElementById("resend").style.textDecoration = "none";
    document.getElementById("resend").style.cursor = "not-allowed";
    document.getElementById("resend").style.opacity = "0.5";
    this.authService.userEmail.email = this.loadService.loadUser().email;
    this.authService.userEmail.message = "Bonjour,\n Votre OTP est:";
    this.authService.userEmail.subject = "Verification de l'OTP";
    this.authService.sendOTP(this.authService.userEmail).subscribe(response => {
      if (response.status == 200) {
        document.getElementById("otpSent").innerHTML = '<ion-icon name="checkmark" style="color:green;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';
        document.getElementById("resend").setAttribute("style", "");
      }
      else {
        document.getElementById("otpSent").innerHTML = '<ion-icon name="close" style="color:red;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';
        document.getElementById("resend").setAttribute("style", "");
      }
    },
      err => {
        if (err.status == 200) {
          document.getElementById("otpSent").innerHTML = '<ion-icon name="checkmark" style="color:green;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';
          document.getElementById("resend").setAttribute("style", "");
        }
        else {
          document.getElementById("otpSent").innerHTML = '<ion-icon name="close" style="color:red;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';
          document.getElementById("resend").setAttribute("style", "");
        }
      });
  }

  verifyOTP(event) {
    this.first = document.getElementById("first");
    this.second = document.getElementById("second");
    this.third = document.getElementById("third");
    this.fourth = document.getElementById("fourth");
    this.fifth = document.getElementById("fifth");
    this.sixth = document.getElementById("sixth");
    var otp = this.first.value + this.second.value + this.third.value + this.fourth.value + this.fifth.value + this.sixth.value;
    this.authService.verifyOTP(parseInt(otp), this.loadService.loadUser().email).subscribe(response => {
      //console.log(response);
      if (response.status == 200) {
        localStorage.setItem("currentOTP", otp);
        this.router.navigateByUrl("/setpassword");
        //alert("ok");
      }
      if (response.status == 400) {
        this.chip.style.display = "block";
        this.errorMessage = "OTP n'est pas correct!";
        //alert("ops1");
      }
    }, err => {
      //console.log(err);
      if (err.status == 200) {
        localStorage.setItem("currentOTP", otp);
        this.router.navigateByUrl("/setpassword");
        //alert("ok2");
      }
      if (err.status == 400) {
        this.chip.style.display = "block";
        this.errorMessage = "OTP n'est pas correct!";
        //alert("ops3");
      }
    });
  }

  closeChip() {
    this.chip.style.display = "none";
  }
}