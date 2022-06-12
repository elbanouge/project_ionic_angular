import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { Credit } from 'src/app/models/credit';
import { Email } from 'src/app/models/email';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CamundaBPMService } from 'src/app/services/camunda-bpm.service';
import { CreditService } from 'src/app/services/credit.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo2Service } from 'src/app/services/photo2.service';
import { CreditPageModule } from '../credit/credit.module';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.page.html',
  styleUrls: ['./decision.page.scss'],
})
export class DecisionPage implements OnInit {

  message: any;
  path: string;
  c: Credit;
  nom: boolean;
  prenom: boolean;
  cin: boolean;
  address: boolean;
  sexe: boolean;
  error: string[] = [];
  id: number;
  email: Email = new Email();
  credit: Credit;

  userModel: User = new User();


  //nom:boolean;
  constructor(public authService: AuthService,
    private router: Router,
    private auth: AuthService,
    private photo1: PhotoService,
    private photo2: Photo2Service,
    private camundaservices: CamundaBPMService,
    private creditservice: CreditService) { }

  ngOnInit() {

    this.message = localStorage.getItem("url");

    if (this.message == 'ops') {
      //alert("ok");
      this.error = localStorage.getItem('errorOCR').split(";");
      //alert(localStorage.getItem('errorOCR'));
      //alert(this.error.indexOf('CIN'));
      if (this.error.indexOf('CIN') != -1) this.cin = true;
      if (this.error.indexOf('Nom') != -1) this.nom = true;
      if (this.error.indexOf('Prenom') != -1) this.prenom = true;
      if (this.error.indexOf('Adresse') != -1) this.address = true;
      if (this.error.indexOf('Sexe') != -1) this.sexe = true;
      /*
      this.error+="CIN;";
      this.error+="Nom;";
                   this.error+="Prenom;";
                   this.error+="Adresse;";
                   this.error+="Sexe;";
      
      <span id="nom" *ngIf="nom=='true'">nom</span>
              <span id="prenom" *ngIf="prenom=='true'">prenom</span>
              <span id="cin" *ngIf="cin=='true'">cin</span>
              <span id="address" *ngIf="address=='true'">address</span>
              <span id="sexe" *ngIf="sexe=='true'">sexe</span>*/
    }
  }

  onClick() {
    this.creditservice.getCreditByUser(this.auth.getUser().email).subscribe(data => {
      this.c = data;

      localStorage.setItem("url", "annuler");
      this.router.navigateByUrl('decision');
      this.message = localStorage.getItem("url");

      this.creditservice.getCreditByUser(this.auth.getUser().email).subscribe(data => {
        this.credit = data;
        this.camundaservices.completeTaskVerManDocs("true", this.credit.taskId).subscribe(
          data => {
            this.creditservice.delete(this.c.id).subscribe(
              data => {
                // this.id = Number(this.c.user.id);
                // this.auth.deletebyid(this.id).subscribe(data => {

                // if (localStorage.getItem("url") != null) localStorage.removeItem("url");
                localStorage.setItem("url", "annuler");
                this.router.navigateByUrl('decision');
                this.message = localStorage.getItem("url");

                // this.router.navigateByUrl('/welcome');

                // }, error => {
                //   if (localStorage.getItem("url") != null) localStorage.removeItem("url");
                //   localStorage.setItem("url", "annuler");
                //   this.router.navigateByUrl('decision');
                //   this.message = localStorage.getItem("url");
                // });
              },
              error => { });
          },
          error => { });
      },
        error => { });
    }, error => { });
  }


  ok() {
    this.creditservice.getCreditByUser(this.auth.getUser().email).subscribe(data => {
      this.credit = data;
      this.camundaservices.completeTaskVerManDocs("false", this.credit.taskId).subscribe(
        data => {
          this.camundaservices.getTaskId(this.credit.user.id, this.credit.processInstanceId).subscribe(
            data => {
              this.credit.taskId = data.split(" : ")[0];
              this.credit.taskName = data.split(" : ")[1];
              localStorage.setItem("currentCredit", JSON.stringify(this.credit));
              this.camundaservices.completeTaskScanDocs(this.credit.taskId, 90).subscribe(
                data => {
                  this.camundaservices.getTaskId(this.credit.user.id, this.credit.processInstanceId).subscribe(
                    data => {
                      this.credit.taskId = data.split(" : ")[0];
                      this.credit.taskName = data.split(" : ")[1];
                      localStorage.setItem("currentCredit", JSON.stringify(this.credit));
                      // this.router.navigateByUrl('ocrop');
                      this.sendEmail();
                    });
                },
                error => { });
            });
        },
        error => { });
    },
      error => { });
  }

  modifier() {
    this.creditservice.getCreditByUser(this.auth.getUser().email).subscribe(layla => {

      this.c = layla;
      this.router.navigateByUrl('/login');

      // this.camundaservices.completeTaskVerManDocs("false", this.c.taskId, this.c.id).subscribe(
      //   lay => {
      //     this.c = lay;
      //     this.camundaservices.completeTaskScanDocs(90, this.c.taskId, this.c.id).subscribe(
      //       a => {
      //         this.router.navigateByUrl('/login');
      //       },
      //       l => { }
      //     )
      //   },
      //   ass => { }
      // )
      //

    },
      assia => { })

  }

  scanner() {

    this.creditservice.getCreditByUser(this.auth.getUser().email).subscribe(data => {
      this.credit = data;
      this.camundaservices.completeTaskVerManDocs("false", this.credit.taskId).subscribe(
        data => {
          this.camundaservices.getTaskId(this.credit.user.id, this.credit.processInstanceId).subscribe(
            data => {
              this.credit.taskId = data.split(" : ")[0];
              this.credit.taskName = data.split(" : ")[1];
              localStorage.setItem("currentCredit", JSON.stringify(this.credit));
              this.router.navigateByUrl('ocrop');
            }
          );

        },
        error => { }
      )
    },
      error => { })
  }

  sendEmail() {
    this.authService.findByEmailpost(this.authService.getUser().email).subscribe(d => {
      this.userModel = d;
      this.creditservice.getCreditByUser(this.userModel.email).subscribe(data => {

        this.credit = data;
        //alert(this.credit.capital);
        this.email.email = this.userModel.email;
        this.email.subject = "Mon Credit";
        if (this.userModel.sexe == 'femme') {
          this.email.message = "Bonjour Madame " + this.userModel.lastName.toUpperCase() + " " + this.userModel.firstName.toUpperCase() + " ;\n\n Votre simulation de credit est: \n\tMontant (DH): " + this.credit.capital + " DH\n\tDurée (mois): " + this.credit.duree + " mois.\n\tMensualité (DH/mois): " + this.credit.mensualite + " DH/mois.\n\n Cordialement.";
        }
        else {  //Monsieur
          this.email.message = "Bonjour Monsieur " + this.userModel.lastName.toUpperCase() + " " + this.userModel.firstName.toUpperCase() + " ;\n\n Votre simulation de credit est: \n\tMontant (DH): " + this.credit.capital + " DH\n\tDurée (mois): " + this.credit.duree + " mois.\n\tMensualité (DH/mois): " + this.credit.mensualite + " DH/mois.\n\n Cordialement.";
        }
        this.authService.sendEmail(this.email).subscribe(res => {

          if (localStorage.getItem("url") != null) localStorage.removeItem("url");
          localStorage.setItem("url", "ok");
          this.router.navigateByUrl('decision');

          // if (localStorage.getItem("url") != null) localStorage.removeItem("url");
          // localStorage.setItem("url", "ok");
          // this.router.navigateByUrl('decision');
          // this.message = localStorage.getItem("url");
          //this.router.navigate(['/decision/ok']);

        }, error => {
          if (error.status == 200) {
            if (localStorage.getItem("url") != null) localStorage.removeItem("url");
            localStorage.setItem("url", "ok");
            this.router.navigateByUrl('decision');
            this.message = localStorage.getItem("url");
          }
          else {
            if (localStorage.getItem("url") != null) localStorage.removeItem("url");
            localStorage.setItem("url", "ok");
            this.router.navigateByUrl('decision');
            this.message = localStorage.getItem("url");
          }
        });
      }, err => {

      });
    }, fal => {

    })
  }


}
