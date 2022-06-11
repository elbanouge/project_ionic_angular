import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credit } from 'src/app/models/credit';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CamundaBPMService } from 'src/app/services/camunda-bpm.service';
import { CreditService } from 'src/app/services/credit.service';
import { LoadService } from 'src/app/services/load.service';
import { SimulationService } from 'src/app/services/simulation.service';

@Component({
  selector: 'app-simulate-res',
  templateUrl: './simulate-res.page.html',
  styleUrls: ['./simulate-res.page.scss'],
})
export class SimulateResPage implements OnInit {
  credit: Credit;
  new: any;
  updateres: any;
  path: string;
  userModel: User;

  constructor(private auth: AuthService,
    public camudaservice: CamundaBPMService,
    private creditService: CreditService, private simulationService: SimulationService,
    private router: Router, private loadService: LoadService,
    private creditservice: CreditService, private authservice: AuthService) {
    this.credit = this.simulationService.getResult();
  }

  ngOnInit() {
    this.path = this.router.url;
    this.updateres = this.path.split('/')[2];
    if (this.updateres != undefined)
      this.new = this.path.split('/')[2];
    setTimeout(data => {
      document.getElementById("capital_res").setAttribute("value", this.credit.capital + " Dhs");
      document.getElementById("duree_res").setAttribute("value", this.credit.duree + " Mois");
      document.getElementById("mensualite_res").setAttribute("value", this.credit.mensualite + " Dhs");
      document.getElementById("taux_res").setAttribute("value", this.credit.taux + " %");
    }, 1000);
  }

  add() {
    this.auth.findByEmailpost(this.loadService.loadUser().email).subscribe(data => {
      this.userModel = data.body;
      this.credit = this.loadService.loadCredit();
      this.creditService.add(this.credit, this.userModel.email).subscribe(data => {
        this.credit = data;
        localStorage.setItem("currentCredit", JSON.stringify(this.credit));

        this.camudaservice.startProcess(this.credit.user).subscribe(
          data => {
            console.log(data.id);
            this.credit.processInstanceId = data.id;
            localStorage.setItem("currentCredit", JSON.stringify(this.credit));
            this.camudaservice.getTaskId(this.userModel.id, this.credit.processInstanceId).subscribe(
              data => {
                this.credit.taskId = data.split(' : ')[0];
                this.credit.taskName = data.split(' : ')[1];
                localStorage.setItem("currentCredit", JSON.stringify(this.credit));

                // this.credit.user.otp = this.loadService.loadOtpUser();
                // this.credit.user.password = this.loadService.loadPasswordUser();
                this.camudaservice.completeTaskOTP(this.credit.user, this.credit.taskId).subscribe(
                  data => {
                    this.camudaservice.getTaskId(this.userModel.id, this.credit.processInstanceId).subscribe(
                      data => {
                        this.credit.taskId = data.split(' : ')[0];
                        this.credit.taskName = data.split(' : ')[1];
                        localStorage.setItem("currentCredit", JSON.stringify(this.credit));

                        this.camudaservice.completeTaskScanDocs(this.credit.taskId, 80).subscribe(
                          data => {
                            this.camudaservice.getTaskId(this.userModel.id, this.credit.processInstanceId).subscribe(
                              data => {
                                this.credit.taskId = data.split(' : ')[0];
                                this.credit.taskName = data.split(' : ')[1];
                                localStorage.setItem("currentCredit", JSON.stringify(this.credit));

                                this.creditservice.getCreditsByUser(this.authservice.getUser().email).subscribe(data => {
                                  localStorage.setItem("credits", JSON.stringify(data));
                                  if (localStorage.getItem("url") != null) localStorage.removeItem("url");
                                  localStorage.setItem("url", "okUp");
                                  this.router.navigateByUrl('decision');
                                  this.router.navigate(["/decision/okUp"]);
                                }, err => { });
                              }
                            );
                          },
                          error => {
                            console.log(error);
                          }
                        )
                      }
                    );
                  },
                  error => {
                    console.log(error);
                  }
                )
              }
            );
          },
          error => {
            console.log(error);
          }
        );

      }, error => {
        if (localStorage.getItem("url") != null) localStorage.removeItem("url");
        localStorage.setItem("url", "opsUp");
        this.router.navigateByUrl('decision');
        this.router.navigate(["/decision/opsUp"]);
      })
    }, error => {
      console.log(error);
    })
  }

  update() {
    this.creditService.update(this.credit, this.creditService.id).subscribe(data => {
      if (localStorage.getItem("url") != null) localStorage.removeItem("url");
      localStorage.setItem("url", "okUp");
      this.router.navigateByUrl('decision');
      //this.router.navigate(["/decision/okUp"]);
    }, err => {
      if (localStorage.getItem("url") != null) localStorage.removeItem("url");
      localStorage.setItem("url", "opsUp");
      this.router.navigateByUrl('decision');
      //this.router.navigate(["/decision/opsUp"]);
    })
  }

  onClickAdd() {
    this.simulationService.setResult(this.credit);
    this.router.navigateByUrl('personalinfos')
  }
}
