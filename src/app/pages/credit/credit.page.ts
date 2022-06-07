import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Camunda } from 'src/app/models/camunda';
import { Credit } from 'src/app/models/credit';
import { AuthService } from 'src/app/services/auth.service';
import { CamundaBPMService } from 'src/app/services/camunda-bpm.service';
import { CreditService } from 'src/app/services/credit.service';


@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {

  private credit: Credit[] = [];
  private camuda: Camunda;

  constructor(private router: Router,
    private camundaservice: CamundaBPMService,
    public actionSheetController: ActionSheetController,
    private creditservice: CreditService,
    private authservice: AuthService,
    public toastController: ToastController) { }

  async ngOnInit() {
    this.creditservice.getByemail(this.authservice.getUser().email).subscribe(data => {
      this.credit = data;
    }, err => { });
  }

  logout() {
    this.authservice.logout();
  }
  refresh() {
    this.creditservice.getByemail(this.authservice.getUser().email).subscribe(data => {
      this.credit = data;
    }, err => { });
  }

  newCredit() {
    this.router.navigateByUrl('/simulate-op/new');
  }

  editCredit() {
    this.router.navigate(['/simulate-op', 'update']);
  }


  public async showActionSheet(c: Credit) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Voulez-vous vraiment modifier le crédit ' + c.creditdate + " du capital " + c.capital + " DH",
      cssClass: 'aas',
      buttons: [{
        text: 'Modifier',
        role: 'destructive',
        icon: 'create-sharp',
        cssClass: 'cssClass',
        handler: () => {
          this.creditservice.id = c.id;
          this.router.navigateByUrl('simulate-op/update')
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        cssClass: 'cssClass',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

  public async delete(c: Credit) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Voulez-vous vraiment supprimer e crédit ' + c.creditdate + " du capital " + c.capital + " DH",
      cssClass: 'aas',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'cssClass',
        handler: () => {
          this.creditservice.delete(c.id).subscribe(data => {
            this.presentToast('Suppression effectuée.', 'success');
            // if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
            //   localStorage.setItem("url","okUp");
            //   this.router.navigateByUrl('decision');
            //this.router.navigate(["/decision/okUp"]);
            this.creditservice.getByemail(this.authservice.getUser().email).subscribe(data => {
              this.credit = data;
            }, err => { });
          }, err => {
            this.presentToast('Suppression échouée.', 'danger');
            // if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
            //   localStorage.setItem("url","opsUp");
            //   this.router.navigateByUrl('decision');
            //this.router.navigate(["/decision/opsUp"]);
          });
        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        cssClass: 'cssClass',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }


  public async status(c: Credit) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Voulez-vous vraiment voir l\'état du crédit ' + c.creditdate + " du capital " + c.capital + " DH",
      cssClass: 'aas',
      buttons: [{
        text: 'ok',
        role: 'destructive',
        icon: 'checkmark',
        cssClass: 'cssClass',
        handler: () => {
          this.camundaservice.getTaskId(c.user.id, c.processInstanceId).subscribe(
            data => {
              c = data;
              //alert(c.user.taskName);
              this.etat(c.taskName);

            },
            err => { }
          )

        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        cssClass: 'cssClass',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

  public async etat(name: string) {

    const actionSheet = await this.actionSheetController.create({

      header: 'L\'état de votre crédit: ' + name,
      cssClass: 'aas',
      buttons: [{
        text: 'ok',
        role: 'destructive',
        icon: 'checkmark',
        cssClass: 'cssClass',
        handler: () => {


        }

      }]
    });
    await actionSheet.present();
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