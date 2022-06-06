import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  // constructor() {}
  answer:any="";


  ngOnInit() {}

  constructor(
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    public alertController: AlertController
  ) {
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({color:"#855fa0"});
    this.platform.backButton.subscribeWithPriority(0, () => {
      // if (this.routerOutlet.canGoBack() || !this.routerOutlet.canGoBack()) {
        // this.presentAlert().then(data=>{
        //   if(this.answer=="ok"){
        //     App.exitApp();
        //   }
        // });
      // }
      this.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      // subHeader: 'Sortir',
      cssClass: 'confirmAlert',
      message: 'Voulez vous vraiment sortir ?',
      buttons: [{
        text: 'Annuler',
        role: 'cancel',
        id: 'cancel-button',
        handler: (answer) => {
          alert.dismiss();
        }
      }, {
        text: 'OK',
        role:"ok",
        id: 'confirm-button',
        handler: (answer) => {
          App.exitApp();
        }
      }]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }


  // ionViewWillEnter(){
  //   StatusBar.setOverlaysWebView({ overlay: false });
  //   StatusBar.setStyle({ style: Style.Dark });
  //   StatusBar.setBackgroundColor({color:"#855fa0"});
  // }
}
