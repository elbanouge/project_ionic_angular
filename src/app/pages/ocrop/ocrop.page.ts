import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
//import { UserPhoto } from 'src/app/services/ocr-services.service';
import { PhotoService, UserPhoto } from 'src/app/services/photo.service';
import { Photo2Service, UserPhoto2 } from 'src/app/services/photo2.service';
import { AuthService } from 'src/app/services/auth.service';
import { Email } from 'src/app/models/email/email';
import { CreditServices } from 'src/app/services/credit-services';
import { Credit } from 'src/app/models/credit/credit';
import { UserData } from 'src/app/models/user/user-data';
import { CamundaBPMService } from 'src/app/services/camunda-bpm.service';

@Component({
  selector: 'app-ocrop',
  templateUrl: './ocrop.page.html',
  styleUrls: ['./ocrop.page.scss'],
})
export class OcropPage implements OnInit {

  email:Email=new Email();
  credit:Credit;
  table:string[]=[];
  d:string;
  error:string="assia;";
  userModel: UserData=new UserData('','','','','','','','','','','','','','','','','');
  
  constructor(private router: Router,
    private camundaservice:CamundaBPMService,
    public authService:AuthService,
    public creditservice:CreditServices,
    public navCtrl: NavController,
    public photoService: PhotoService,
    public photo2Service: Photo2Service,
    public actionSheetController: ActionSheetController) {}

  buttonhasCli:boolean=false;
  buttonhasCli2:boolean;
  beenClicked: boolean = false;
  ok:boolean=false;
  addPhotoToGallery(button:any):any {
    this.photoService.addNewToGallery();
    button.disabled=true;
    this.buttonhasCli = true;
    this.ok=false;
    //alert("finale: "+this.photoService.addNewToGallery());
   // return this.photoService.photos//=photo;

  }
  addPhotoToGallery2(button2:any):any {
    if(this.buttonhasCli==false) {
      //alert("jjjh");
      this.ok=true;
    }
    this.photo2Service.addNewToGallery2();
    button2.disabled=true;
    //button3.disabled=true;
    
    this.buttonhasCli2 = true;
    this.beenClicked = true;
    //if(this.beenClicked==true) var button3=document.getElementById("button3").ariaDisabled;
   // return this.photoService.photos//=photo;

  }
  

  ngOnInit() {
  }

  public async showActionSheet(photo: UserPhoto, position: number,button:any) {
    const actionSheet = await this.actionSheetController.create({
      cssClass:'aas',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        cssClass: 'cssClass',
        handler: () => {
          this.photoService.deletePicture(photo, position);
          button.disabled=false;
          this.buttonhasCli = false;
          if(this.buttonhasCli==false) {
            //alert("jjjh");
            this.ok=true;
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


  public async showActionSheet2(photo: UserPhoto2, position: number,button2:any) {
    this.beenClicked = false;
    const actionSheet = await this.actionSheetController.create({
      //header: 'Êtes-vous sur',
      cssClass:'aas',
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


  assia:string;
  ok1:boolean=false;
  ok2:boolean=false;
  ok3:boolean=false;
  ok4:boolean=false;
  ok5:boolean=false;
  async valider(){//this.authService.getUser().email;

    if( this.buttonhasCli==true &&  this.buttonhasCli2==true){
      /** CNIE recto*/
        let spinner=document.getElementById('spinner');
        document.getElementById("sendButton").setAttribute("disabled","true");
        let obtenirOtpLabel=document.getElementById('obtenirOtpLabel');
        obtenirOtpLabel.style.display="none";
        spinner.style.display="block";
      var url1 = document.getElementById('url1');
      const response1 = await fetch(url1.textContent);
      const blob1 = await response1.blob();

      /** CNIE verso*/
      var url2 = document.getElementById('url2');
      const response2 = await fetch(url2.textContent);
      const blob2 = await response2.blob();
      if(this.buttonhasCli2==true && this.buttonhasCli==true){
        this.authService.findByEmailpost(this.authService.getUser().email).subscribe(d=>{
          this.userModel=d;
              /** CNIE recto*/
            
          const formData = new FormData();
          formData.append('file', blob1, this.userModel.email+"_CNIErecto.png");
          formData.append('lang', 'fra');
          formData.append('id_user', this.userModel.id);
          this.photoService.postData(formData).subscribe(
              (data) => {
              },
              (error) => {
              }
            );

            /** CNIE verso*/
        
          const formData2 = new FormData();
          formData2.append('file', blob2, this.userModel.email+"_CNIEverso.png");
          formData2.append('lang', 'fra');
          formData2.append('id_user', this.userModel.id);
          this.photo2Service.postData2(formData2).subscribe(
              (data) => {
                this.d=data;
                //alert(this.d);
                  //this.table=this.d;
                if(this.d.indexOf(("CIN user and CIN OCR are the same"))!=-1){
                  //this.sendEmail();
                  //alert("CIN user and CIN OCR are ok");
                  this.ok1=true;
                }else if(this.d.indexOf("CIN user and CIN OCR are diferent")!=-1) {
                  this.error+="CIN;";
                  //alert("CIN user and CIN OCR are diferent");
                  this.ok1=false;
                }

                if(this.d.indexOf(("Nom user and Nom OCR are the same"))!=-1){
                  //this.sendEmail();
                  //alert("Nom user and Nom OCR  are ok");
                  this.ok2=true;
                }else if(this.d.indexOf("Nom user and Nom OCR  are different")!=-1) {
                this.error+="Nom;";
                  //alert("Nom user and Nom OCR  are different");
                  this.ok2=false;
                }

                if(this.d.indexOf(("Prenom user and Prenom OCR are the same"))!=-1){
                  //this.sendEmail();
                  //alert("Prenom user and Prenom OCR are ok");
                  this.ok3=true;
                }else if(this.d.indexOf("Prenom user and Prenom OCR are different")!=-1) { 
                this.error+="Prenom;";
                  //alert("Prenom user and Prenom OCR are different");
                  this.ok3=false;
                }

                if(this.d.indexOf(("Adresse user and Adresse OCR are the same"))!=-1){
                  //this.sendEmail();
                  this.ok4=true;
                  //alert("Adresse user and Adresse OCR are ok");
                }else if(this.d.indexOf("Adresse user and Adresse OCR are different")!=-1) {
                this.error+="Adresse;";
                this.ok4=false;
                //alert("Adresse user and Adresse OCR are different");
                }

                if(this.d.indexOf(("Sexe user and Sexe OCR are the same"))!=-1){
                  this.ok5=true;
                  //alert("Sexe user and Sexe OCR ok");
                }else if(this.d.indexOf("Sexe user and Sexe OCR are different")!=-1) {
                this.error+="Sexe;";
                this.ok5=false;
                //alert("Sexe user and Sexe OCR are different");
                }
                //this.ok1=true;
                // alert(this.ok1);
                // alert(this.ok2);
                // alert(this.ok3);
                // alert(this.ok4);
                // alert(this.ok5);
                //this.ok1=true;
                //this.ok4=true;
                if(this.ok1==true && 
                  this.ok2==true && 
                  this.ok3==true && 
                  this.ok4==true && 
                  this.ok5==true){
                    this.creditservice.getoneByemail(this.userModel.email).subscribe(data=>{

                      this.credit=data;
                      this.camundaservice.completeTaskScanDocs(90,this.credit.taskId,this.credit.id).subscribe(
                        a=>{this.email.email=this.userModel.email;
                          this.email.subject="Mon Credit";
                          if(this.userModel.sexe=='femme'){ 
                            this.email.message="Bonjour Madame "+this.userModel.lastName.toUpperCase()+" "+this.userModel.firstName.toUpperCase()+" ;\n\n Votre simulation de credit est: \n\tMontant (DH): "+this.credit.capital+" DH\n\tDurée (mois): "+this.credit.duree+" mois.\n\tMensualité (DH/mois): "+this.credit.mensualite+" DH/mois.\n\n Cordialement.";
                          }
                          else {  //Monsieur
                            this.email.message="Bonjour Monsieur "+this.userModel.lastName.toUpperCase()+" "+this.userModel.firstName.toUpperCase()+" ;\n\n Votre simulation de credit est: \n\tMontant (DH): "+this.credit.capital+" DH\n\tDurée (mois): "+this.credit.duree+" mois.\n\tMensualité (DH/mois): "+this.credit.mensualite+" DH/mois.\n\n Cordialement.";
                          }        
                          this.authService.sendEmail(this.email).subscribe(res=>{
                              if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
                              localStorage.setItem("url","ok");
                              this.router.navigateByUrl('decision');
                              //this.router.navigate(['/decision/ok']);
                                      
                            },error=>{
                              if(error.status==200) {
                                if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
                              localStorage.setItem("url","ok");
                              this.router.navigateByUrl('decision');
                              }
                              else{if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
                              localStorage.setItem("url","ok");
                              this.router.navigateByUrl('decision');}
                            });}
                          ,l=>{}
                      )
                      //alert(this.credit.capital);
                      
                    },err=>{
                
                    });
                  }
                else if( this.ok1==false ||
                  this.ok2==false || 
                  this.ok3==false || 
                  this.ok4==false || 
                  this.ok5==false){
                    this.creditservice.getoneByemail(this.userModel.email).subscribe(data=>{

                      this.credit=data;
                      this.camundaservice.completeTaskScanDocs(60,this.credit.taskId,this.credit.id).subscribe(
                        ad=>{
                          if(localStorage.getItem('errorOCR'))
                            localStorage.removeItem('errorOCR');
                          localStorage.setItem('errorOCR', this.error);
                          if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
                          localStorage.setItem("url","ops");
                          this.router.navigateByUrl('decision');
                          // this.photo2Service.photos2=null;
                          // this.photoService.photos=null;
                          // this.buttonhasCli=false;
                          // this.buttonhasCli2=false;
                          // this.beenClicked=false;
                          // button.disabled=false;
                          // button2.disabled=false;
                          // this.ok=true;
                          //this.photo2Service.photos2=
                          //this.router.navigate(['/decision/ops']);
                        },
                        le=>{}
                  )})
                    //alert("ttt");
                  
                }
                
              },
              (error) => {
                spinner.style.display="none";
                document.getElementById("sendButton").removeAttribute("disabled");
                obtenirOtpLabel.style.display="block";
              }
            );
  
        },e=>{

        });
      }
    }
  }

  sendEmail(){
    
  }


  sendEmail2(){
    this.creditservice.getoneByemail(this.userModel.email).subscribe(data=>{

      this.credit=data;
      //alert(this.credit.capital);
      this.email.email=this.userModel.email;
      this.email.subject="Mon Credit";
      if(this.userModel.sexe=='femme'){ 
        this.email.message="Bonjour Madame "+this.userModel.lastName.toUpperCase()+" "+this.userModel.firstName.toUpperCase()+" ;\n\n Votre simulation de credit est: \n\tMontant (DH): "+this.credit.capital+" DH\n\tDurée (mois): "+this.credit.duree+" mois.\n\tMensualité (DH/mois): "+this.credit.mensualite+" DH/mois.\n\n Cordialement.";
      }
      else {  //Monsieur
        this.email.message="Bonjour Monsieur "+this.userModel.lastName.toUpperCase()+" "+this.userModel.firstName.toUpperCase()+" ;\n\n Votre simulation de credit est: \n\tMontant (DH): "+this.credit.capital+" DH\n\tDurée (mois): "+this.credit.duree+" mois.\n\tMensualité (DH/mois): "+this.credit.mensualite+" DH/mois.\n\n Cordialement.";
      }        
      this.authService.sendEmail(this.email).subscribe(res=>{
         // this.router.navigate(['/decision/ok']);
                  
        },error=>{
          //if(error.status==200) this.router.navigate(['/decision/ok']);
          //else{this.router.navigate(['/decision/ok']);}
        });
    },err=>{

    });
  }
}
