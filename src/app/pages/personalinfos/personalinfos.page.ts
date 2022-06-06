import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, IonDatetime, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { UserData } from 'src/app/models/user/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { CreditServices } from 'src/app/services/credit-services';
import { Credit } from 'src/app/models/credit/credit';
import { CamundaBPMService } from 'src/app/services/camunda-bpm.service';
import { Camunda } from 'src/app/models/camunda/camunda';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-personalinfos',
  templateUrl: './personalinfos.page.html',
  styleUrls: ['./personalinfos.page.scss'],
})
export class PersonalinfosPage implements OnInit {
  
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  
  ionicForm: FormGroup;
  isSubmitted = false;
  dateValue = '';
  dateValue2 = '';
  errorMessageMail:string;
  beenClicked: boolean = false;
  beenClicked2: boolean = false;
  beenClicked3: boolean = false;
  beenClicked4: boolean = false;
  beenClicked5: boolean = false;
  beenClicked6: boolean = false;
  beenClicked7: boolean = false;
  sliderConfig={

  }
  credit:Credit;
  userModel: UserData=new UserData('','','','','','','','','','','','','','','','','');
  camundaModel:Camunda;
  constructor(public formBuilder: FormBuilder,
    private router: Router,
  private camudaservice:CamundaBPMService,
  public actionSheetController: ActionSheetController,
     private authServices: AuthService,
     private creditservice:CreditServices,
     public toastController: ToastController) { 
      this.credit=creditservice.getResult();
      
  }

  ngOnInit() {
    //document.getElementById("yes").setAttribute("style",this.credit.minMensualite);
    this.errorMessageMail="";
    this.ionicForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern('^[0-9]+$')]],
      cinval: ['',[Validators.required, Validators.maxLength(7), Validators.minLength(7),Validators.pattern('[A-Z]{1,2}[0-9]{5,6}')]],
      date:['',[Validators.required]],
      nationalite:['',[Validators.required]]
    });
    this.errorMessageMail="";
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async Valider(homme:any,femme:any){ 
    // if(this.userModel.sexe=='')
    //   alert(this.userModel.sexe);
    this.isSubmitted = true;
    if(this.beenClicked===true) this.userModel.client="true";
    if(this.beenClicked2) this.userModel.client="false";

    //alert(this.userModel.client);

    if(this.beenClicked3) this.userModel.fonctionnaire="true";
    if(this.beenClicked4) this.userModel.fonctionnaire="false";

    //alert(this.userModel.fonctionnaire);


    if(this.beenClicked5) this.userModel.mensuel="<=7000";
    else if(this.beenClicked6) this.userModel.mensuel=">7000 && <20000";
    else if(this.beenClicked7) this.userModel.mensuel=">=20000";
    //else this.userModel.mensuel="<=7000";

   // alert(this.userModel.mensuel);
   this.errorMessageMail="";
   
     if (this.ionicForm.valid) {
        if(this.userModel.sexe!=''){
          if(this.beenClicked || this.beenClicked2){
            if(this.beenClicked3 || this.beenClicked4){
              if(this.beenClicked5 || this.beenClicked6 || this.beenClicked7){
                let spinner=document.getElementById('spinnerEnvoyer');
                document.getElementById("EnvoyerButton").setAttribute("disabled","true");
                let obtenirEnvoyerLabel=document.getElementById('obtenirEnvoyerLabel');
                obtenirEnvoyerLabel.style.display="none";
                spinner.style.display="block";
                this.authServices.Personalinfos(this.userModel).subscribe(data =>{
                        //this.authServices.findByEmailpost(this.userModel.email).subscribe(data =>{
                          //alert("ok");
                          this.credit.user=this.userModel;
                          localStorage.setItem('user', JSON.stringify(this.userModel));
                          this.creditservice.add(this.credit).subscribe(data =>{
                            this.credit=data
                            this.camudaservice.startProcess(this.credit).subscribe(
                              res =>{this.router.navigateByUrl("send-otp");},
                              fal =>{}
                            );
                            
                            
                          },err =>{});
                        
                         // },err =>{});
                      },err =>{
                        this.errorMessageMail="Email est déjà exist";
                        spinner.style.display="none";
                        document.getElementById("EnvoyerButton").removeAttribute("disabled");
                        obtenirEnvoyerLabel.style.display="block";
                      })  
              }else {
                const actionSheet = await this.actionSheetController.create({
                  header: 'Quel est votre revenu mensuel ?',
                  cssClass:'aas',
                  buttons: [{
                    text: 'Inférieur ou égale à 7000Dh',
                    icon: 'chevron-back-outline',
                    cssClass: 'cssClass',
                    handler: () => {
                      this.userModel.mensuel="<=7000";
                      this.beenClicked5=true;
                      this.Valider(homme,femme);
                    }
                  }, {
                    text: 'Entre 7000Dh et 20 000Dh',
                    icon: 'code-sharp',
                    cssClass: 'cssClass',
                    //role: 'cancel',
                    handler: () => {
                      this.userModel.mensuel=">7000 && <20000";
                      this.beenClicked6=true;
                      this.Valider(homme,femme);
                    }
                  },{//<ion-icon name="cash-outline"></ion-icon>
                    text: 'Supérieur à 20 000Dh',
                    icon: 'chevron-forward-outline',
                    cssClass: 'cssClass',
                    handler: () => {
                      this.userModel.mensuel=">=20000";
                      this.beenClicked7=true;
                      this.Valider(homme,femme);
                    }
                  }]
                });
                await actionSheet.present();
              }
            }else {
              const actionSheet = await this.actionSheetController.create({
                header: 'Êtes-vous un fonctionnaire ?',
                cssClass:'aas',
                buttons: [{
                  text: 'oui',
                  icon: 'checkmark-sharp',
                  cssClass: 'cssClass',
                  handler: () => {
                    this.userModel.fonctionnaire="true";
                    this.beenClicked3=true;
                    this.Valider(homme,femme);
                  }
                }, {
                  text: 'non',
                  icon: 'close',
                  cssClass: 'cssClass',
                  handler: () => {
                    this.userModel.fonctionnaire="false";
                    this.beenClicked4=true;
                    this.Valider(homme,femme);
                  }
                }]
              });
              await actionSheet.present();
            }
          }else {
            const actionSheet = await this.actionSheetController.create({
              header: 'Êtes-vous client ?',
              cssClass:'aas',
              buttons: [{
                text: 'oui',
                icon: 'checkmark-sharp',
                cssClass: 'cssClass',
                handler: () => {
                  this.userModel.client="true";
                  this.beenClicked=true;
                  this.Valider(homme,femme);
                }
              }, {
                text: 'non',
                icon: 'close',
                cssClass: 'cssClass',
                handler: () => {
                  this.userModel.client="false";
                  this.beenClicked2=true;
                  this.Valider(homme,femme);
                }
              }]
            });
            await actionSheet.present();
            }
        }else {
          const actionSheet = await this.actionSheetController.create({
            header: 'Veuillez indiquer votre sexe',
            cssClass:'aas',
            buttons: [{
              text: 'Femme',
              icon: 'female-sharp',
              cssClass: 'cssClass',
              handler: () => {
                this.userModel.sexe="femme";
                femme.checked="true";
                this.Valider(homme,femme);
              }
            }, {
              text: 'Homme',
              icon: 'male-sharp',
              cssClass: 'cssClass',
              handler: () => {
                this.userModel.sexe="homme";
                homme.checked="true";
                this.Valider(homme,femme);
              }
            }]
          });
          await actionSheet.present();
        }
      
     }else {
       const actionSheet = await this.actionSheetController.create({
      header: 'Veuillez remplir tous',
      cssClass:'aas',
      buttons: [{
        text: 'OK',
        icon: 'checkmark-sharp',
        cssClass: 'cssClass',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }
  }

  emailElement:any;
  ionChangeEmail(){

    this.errorMessageMail='';
  }


  get date(): any {
    return this.dateValue;
  }
  set date(value: any) {
    this.dateValue = value;
  }
 

  formatDate(value: string) {
    return format(parseISO(value), 'dd/MM/yyyy');
  }
  
  clickAction() {
    this.beenClicked2 = false;
    this.beenClicked = true;
  }

  clickAction2() {
    this.beenClicked = false;
    this.beenClicked2 = true;
  }

  clickAction3() {
    this.beenClicked3 = true;
    this.beenClicked4 = false;
  }

  clickAction4() {
    this.beenClicked3 = false;
    this.beenClicked4 = true;
  }

  clickAction5() {
    this.beenClicked6 = false;
    this.beenClicked7 = false;
    this.beenClicked5 = true;
  }

  clickAction6() {
    this.beenClicked5 = false;
    this.beenClicked7 = false;
    this.beenClicked6 = true;
  }

  clickAction7() {
    this.beenClicked5 = false;
    this.beenClicked6 = false;
    this.beenClicked7 = true;
  }

  
}
