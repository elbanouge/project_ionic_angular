import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
//import { UserPhoto } from 'src/app/services/ocr-services.service';
import { PhotoService, UserPhoto } from 'src/app/services/photo.service';
import { Photo2Service, UserPhoto2 } from 'src/app/services/photo2.service';
import { AuthService } from 'src/app/services/auth.service';
import { Email } from 'src/app/models/email';
import { CreditService } from 'src/app/services/credit.service';
import { Credit } from 'src/app/models/credit';
import { User } from 'src/app/models/user';
import { CamundaBPMService } from 'src/app/services/camunda-bpm.service';
import { LoadService } from 'src/app/services/load.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { OCR } from 'src/app/models/ocr';

@Component({
  selector: 'app-ocrop',
  templateUrl: './ocrop.page.html',
  styleUrls: ['./ocrop.page.scss'],
})
export class OcropPage implements OnInit {

  email: Email = new Email();
  credit: Credit;
  table: string[] = [];
  d: string;
  error: string = "assia;";
  userModel: User = new User();
  ocrR: OCR = new OCR();
  ocrV: OCR = new OCR();

  resR: string;
  resV: string;

  constructor(private router: Router,
    private loadService: LoadService,
    private camundaService: CamundaBPMService,
    private scannerService: ScannerService,
    public authService: AuthService,
    public creditservice: CreditService,
    public navCtrl: NavController,
    public photoService: PhotoService,
    public photo2Service: Photo2Service,
    public actionSheetController: ActionSheetController) { }

  buttonhasCli: boolean = false;
  buttonhasCli2: boolean;
  beenClicked: boolean = false;
  ok: boolean = false;
  addPhotoToGallery(button: any): any {
    this.photoService.addNewToGallery();
    button.disabled = true;
    this.buttonhasCli = true;
    this.ok = false;
    //alert("finale: "+this.photoService.addNewToGallery());
    // return this.photoService.photos//=photo;

  }
  addPhotoToGallery2(button2: any): any {
    if (this.buttonhasCli == false) {
      //alert("jjjh");
      this.ok = true;
    }
    this.photo2Service.addNewToGallery2();
    button2.disabled = true;
    //button3.disabled=true;

    this.buttonhasCli2 = true;
    this.beenClicked = true;
    //if(this.beenClicked==true) var button3=document.getElementById("button3").ariaDisabled;
    // return this.photoService.photos//=photo;

  }


  ngOnInit() {
  }

  public async showActionSheet(photo: UserPhoto, position: number, button: any) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'aas',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'cssClass',
        handler: () => {
          this.photoService.deletePicture(photo, position);
          button.disabled = false;
          this.buttonhasCli = false;
          if (this.buttonhasCli == false) {
            //alert("jjjh");
            this.ok = true;
          }
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


  public async showActionSheet2(photo: UserPhoto2, position: number, button2: any) {
    this.beenClicked = false;
    const actionSheet = await this.actionSheetController.create({
      //header: 'Êtes-vous sur',
      cssClass: 'aas',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'cssClass',
        handler: () => {
          this.photo2Service.deletePicture2(photo, position);
          //button2.disabled=false;

          this.buttonhasCli2 = false;
          //this.beenClicked = false;
          //this.router.navigateByUrl('ocrop');

        }
      }, {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        cssClass: 'cssClass',
        handler: () => {
          this.beenClicked = true;
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }


  assia: string;
  ok1: boolean = false;
  ok2: boolean = false;
  ok3: boolean = false;
  ok4: boolean = false;
  ok5: boolean = false;
  async valider() {

    if (this.buttonhasCli == true && this.buttonhasCli2 == true) {

      let spinner = document.getElementById('spinner');
      document.getElementById("sendButton").setAttribute("disabled", "true");
      let obtenirOtpLabel = document.getElementById('obtenirOtpLabel');
      obtenirOtpLabel.style.display = "none";
      spinner.style.display = "block";

      /** CNIE recto **/
      var url1 = document.getElementById('url1');
      const response1 = await fetch(url1.textContent);
      const blob1 = await response1.blob();

      /** CNIE verso **/
      var url2 = document.getElementById('url2');
      const response2 = await fetch(url2.textContent);
      const blob2 = await response2.blob();

      if (this.buttonhasCli2 == true && this.buttonhasCli == true) {
        this.authService.findByEmailpost(this.loadService.loadUser().email).subscribe(d => {
          localStorage.setItem('currentUser', JSON.stringify(d.body));
          console.log(this.loadService.loadUser());
          this.userModel = this.loadService.loadUser();

          /** CNIE recto **/
          const formData = new FormData();
          formData.append('file', blob1, this.userModel.email + "_CNIERecto.png");
          formData.append('lang', 'fra');
          formData.append('id_user', this.userModel.id);
          this.photoService.postData(formData).subscribe(
            data => {

              /** CNIE verso **/
              const formData2 = new FormData();
              formData2.append('file', blob2, this.userModel.email + "_CNIEVerso.png");
              formData2.append('lang', 'fra');
              formData2.append('id_user', this.userModel.id);
              this.photo2Service.postData2(formData2).subscribe(
                data => {
                  this.credit = this.loadService.loadCredit();
                  this.email.email = this.userModel.email;
                  this.email.subject = "Mon Credit";

                  if (this.userModel.sexe == 'false') { // Si c'est une femme
                    this.email.message = "Bonjour Madame " +
                      this.userModel.lastName.toUpperCase() + " "
                      + this.userModel.firstName.toUpperCase()
                      + " ;\n\n Votre simulation de credit est: \n\tMontant (DH): "
                      + this.credit.capital + " DH\n\tDurée (mois): "
                      + this.credit.duree + " mois.\n\tMensualité (DH/mois): "
                      + this.credit.mensualite + " DH/mois.\n\n Cordialement.";
                  }
                  else {  // Si c'est un homme
                    this.email.message = "Bonjour Monsieur " + this.userModel.lastName.toUpperCase()
                      + " " + this.userModel.firstName.toUpperCase()
                      + " ;\n\n Votre simulation de credit est: \n\tMontant (DH): "
                      + this.credit.capital + " DH\n\tDurée (mois): " + this.credit.duree
                      + " mois.\n\tMensualité (DH/mois): " + this.credit.mensualite
                      + " DH/mois.\n\n Cordialement.";
                  }
                  this.ocrR.image = './src/main/resources/images/' + this.userModel.email + '_CNIERecto.png';
                  this.ocrR.id_user = this.userModel.id;

                  this.ocrV.image = './src/main/resources/images/' + this.userModel.email + '_CNIEVerso.png';
                  this.ocrV.id_user = this.userModel.id;

                  this.scannerService.scanCINRecto(this.ocrR).subscribe(
                    data => {
                      this.resR = data;
                      this.scannerService.scanCINVerso(this.ocrV).subscribe(
                        data => {
                          this.resV = data;
                          if (this.resV != null && this.resR != null) {
                            if (!this.resV.includes("Info OCR and user are different")) {
                              if (!this.resR.includes("Info OCR and user are different")) {
                                this.authService.sendEmail(this.email).subscribe(
                                  data => {
                                    this.camundaService.completeTaskScanDocs(this.credit.taskId, 80).subscribe(
                                      data => {
                                        this.camundaService.getTaskId(this.credit.user.id, this.credit.processInstanceId).subscribe(
                                          data => {
                                            this.credit.taskId = data.split(" : ")[0];
                                            this.credit.taskName = data.split(" : ")[1];
                                            localStorage.setItem('currentCredit', JSON.stringify(this.credit));
                                            if (localStorage.getItem("url") != null) localStorage.removeItem("url");
                                            localStorage.setItem("url", "ok");
                                            this.router.navigateByUrl('decision');
                                          });
                                      }, error => {
                                        console.log(error);
                                      }
                                    );
                                  },
                                  error => {
                                    if (error.status == 200) {
                                      this.camundaService.completeTaskScanDocs(this.credit.taskId, 80).subscribe(
                                        data => {
                                          this.camundaService.getTaskId(this.credit.user.id, this.credit.processInstanceId).subscribe(
                                            data => {
                                              this.credit.taskId = data.split(" : ")[0];
                                              this.credit.taskName = data.split(" : ")[1];
                                              localStorage.setItem('currentCredit', JSON.stringify(this.credit));
                                              if (localStorage.getItem("url") != null) localStorage.removeItem("url");
                                              localStorage.setItem("url", "ok");
                                              this.router.navigateByUrl('decision');
                                            });
                                        }, error => {
                                          console.log(error);
                                        }
                                      );
                                    }
                                  });
                              } else {
                                this.camundaService.completeTaskScanDocs(this.credit.taskId, 40).subscribe(
                                  data => {
                                    this.camundaService.getTaskId(this.credit.user.id, this.credit.processInstanceId).subscribe(
                                      data => {
                                        this.credit.taskId = data.split(" : ")[0];
                                        this.credit.taskName = data.split(" : ")[1];
                                        localStorage.setItem('currentCredit', JSON.stringify(this.credit));
                                        if (localStorage.getItem('errorOCR'))
                                          localStorage.removeItem('errorOCR');
                                        localStorage.setItem('errorOCR', this.error);
                                        if (localStorage.getItem("url") != null) localStorage.removeItem("url");
                                        localStorage.setItem("url", "ops");
                                        this.router.navigateByUrl('decision');
                                      });
                                  }, error => {
                                    console.log(error);
                                  }
                                );
                              }
                            } else {
                              this.camundaService.completeTaskScanDocs(this.credit.taskId, 40).subscribe(
                                data => {
                                  this.camundaService.getTaskId(this.credit.user.id, this.credit.processInstanceId).subscribe(
                                    data => {
                                      this.credit.taskId = data.split(" : ")[0];
                                      this.credit.taskName = data.split(" : ")[1];
                                      localStorage.setItem('currentCredit', JSON.stringify(this.credit));
                                      if (localStorage.getItem('errorOCR'))
                                        localStorage.removeItem('errorOCR');
                                      localStorage.setItem('errorOCR', this.error);
                                      if (localStorage.getItem("url") != null) localStorage.removeItem("url");
                                      localStorage.setItem("url", "ops");
                                      this.router.navigateByUrl('decision');
                                    });
                                }, error => {
                                  console.log(error);
                                }
                              );
                            }
                          }
                        });
                    },
                    error => {
                      console.log(error);
                    }
                  );
                }, error => {
                  spinner.style.display = "none";
                  document.getElementById("sendButton").removeAttribute("disabled");
                  obtenirOtpLabel.style.display = "block";
                }
              )
            },
            error => {
              spinner.style.display = "none";
              document.getElementById("sendButton").removeAttribute("disabled");
              obtenirOtpLabel.style.display = "block";
            }
          );
        }, error => {
          console.log(error);
        });
      }
    } else {
      alert("Veuillez choisir une photo");
    }
  }
}
