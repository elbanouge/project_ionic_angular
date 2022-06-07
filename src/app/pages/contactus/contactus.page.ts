import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Email } from 'src/app/models/email';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  EmailModel: Email;
  constructor(private userServices: AuthService,
    private router: Router,
    public toastController: ToastController) { }

  ngOnInit() {
    this.EmailModel = new Email();


  }

  logout() { this.userServices.logout(); }

  ValiderEmail(email: any) {
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (email.value.length != 0) {
      if (!pattern.test(email.value)) {
        document.getElementById("emailcheck").innerHTML = '<ion-icon name="close" style="color:red;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';
        email.focus;

      }
      else {
        document.getElementById("emailcheck").innerHTML = '<ion-icon name="checkmark" style="color:green;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';
        email.focus;
      }
    }
    else
      document.getElementById("emailcheck").innerHTML = '<ion-icon name="close" style="color:red;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';




  }

  ValiderMessage(message: any) {
    if (message.value.length != 0)
      document.getElementById("messagecheck").innerHTML = '<ion-icon name="checkmark" style="color:green;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';
    else
      document.getElementById("messagecheck").innerHTML = '<ion-icon name="close" style="color:red;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';


  }

  ValiderName(name: any) {
    if (name.value.length != 0)
      document.getElementById("namecheck").innerHTML = '<ion-icon name="checkmark" style="color:green;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';
    else
      document.getElementById("namecheck").innerHTML = '<ion-icon name="close" style="color:red;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';


  }

  onSubmit(email: any, name: any, message: any) {
    var messagecheck = document.getElementById("messagecheck");
    var emailcheck = document.getElementById("emailcheck");
    var namecheck = document.getElementById("namecheck");

    if (messagecheck.innerHTML == '<ion-icon name="checkmark" style="color:green;width:20px;height:20px;position: relative;top: 5px;" aria-label="checkmark" role="img" class="md hydrated"></ion-icon>' &&
      emailcheck.innerHTML == '<ion-icon name="checkmark" style="color:green;width:20px;height:20px;position: relative;top: 5px;" aria-label="checkmark" role="img" class="md hydrated"></ion-icon>' &&
      namecheck.innerHTML == '<ion-icon name="checkmark" style="color:green;width:20px;height:20px;position: relative;top: 5px;" aria-label="checkmark" role="img" class="md hydrated"></ion-icon>') {
      //name.value;
      let spinner = document.getElementById('spinner');
      document.getElementById("sendButton").setAttribute("disabled", "true");
      let obtenirOtpLabel = document.getElementById('obtenirOtpLabel');
      obtenirOtpLabel.style.display = "none";
      spinner.style.display = "block";
      this.EmailModel.subject = "Contactez-nous: Email de " + name.value;

      this.EmailModel.message = " Nom Complet: " + name.value.toUpperCase() + "\n" + " Email: " + email.value + "\n Message: " + message.value;
      //alert(this.EmailModel.message);
      this.userServices.sendEmailToAdmin(this.EmailModel).subscribe(
        layla => {
          this.EmailModel.email = "";
          //this.EmailModel.message=message.value;
          this.EmailModel.message = "";
          this.EmailModel.subject = "";
          email.value = "";
          name.value = "";
          message.value = "";
          this.presentToast('Votre message a été envoyé.', 'success');

          // if(localStorage.getItem("url")!=null) 
          //   localStorage.removeItem("url");
          // localStorage.setItem("url","okcontact");
          // this.router.navigateByUrl('decision');
          //this.router.navigate(["/decision/okcontact"]);
        },
        assia => {
          if (assia.status == 200) {
            this.EmailModel.email = "";
            //this.EmailModel.message=message.value;
            this.EmailModel.subject = "";
            this.EmailModel.message = "";
            email.value = "";
            name.value = "";
            message.value = "";
            this.presentToast('Votre message a été envoyé.', 'success');
            spinner.style.display = "none";
            document.getElementById("sendButton").removeAttribute("disabled");
            obtenirOtpLabel.style.display = "block";
            // if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
            // localStorage.setItem("url","okcontact");
            // this.router.navigateByUrl('decision');
          }

          else {
            //this.EmailModel.message=message.value;
            this.presentToast('le message n\'a pas été envoyé.', 'danger');
            spinner.style.display = "none";
            document.getElementById("sendButton").removeAttribute("disabled");
            obtenirOtpLabel.style.display = "block";
            // if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
            // localStorage.setItem("url","opscontact");
            // this.router.navigateByUrl('decision');
          }
          //this.router.navigate(["/decision/opscontact"]);
        }
      )

    }

    else {
      if (message.value.length == 0)
        document.getElementById("messagecheck").innerHTML = '<ion-icon name="close" style="color:red;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';

      if (email.value.length == 0)
        document.getElementById("emailcheck").innerHTML = '<ion-icon name="close" style="color:red;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';

      if (name.value.length == 0)
        document.getElementById("namecheck").innerHTML = '<ion-icon name="close" style="color:red;width:20px;height:20px;position: relative;top: 5px;"></ion-icon>';

    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

}
