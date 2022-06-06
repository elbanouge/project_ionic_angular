import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Email } from 'src/app/models/email/email';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.page.html',
  styleUrls: ['./send-otp.page.scss'],
})
export class SendOTPPage implements OnInit {
  userEmail:Email;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.userEmail=new Email();
    this.userEmail.email=this.authService.getUser().email;
    this.userEmail.message="Bonjour,\n Votre OTP est:";
    this.userEmail.subject="Verification de l'OTP";
  }
  sendOTP()
  {
    let spinner=document.getElementById('spinner');
    document.getElementById("sendButton").setAttribute("disabled","true");
    let obtenirOtpLabel=document.getElementById('obtenirOtpLabel');
    obtenirOtpLabel.style.display="none";
    spinner.style.display="block";
    this.authService.sendOTP(this.userEmail).subscribe(data=>{
      if(data.status==200)
        {
          spinner.style.display="none";
          document.getElementById("sendButton").removeAttribute("disabled");
          obtenirOtpLabel.style.display="block";
          this.router.navigateByUrl("verify-otp");
        }
      },
      err=>{
        if(err.status==200)
        {
          this.router.navigateByUrl("verify-otp");
        }
      });
  }
}