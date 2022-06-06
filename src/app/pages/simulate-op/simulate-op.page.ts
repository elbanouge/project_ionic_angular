import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credit } from 'src/app/models/credit/credit';
import { UserData } from 'src/app/models/user/user-data';
import { CreditServices } from 'src/app/services/credit-services';

@Component({
  selector: 'app-simulate-op',
  templateUrl: './simulate-op.page.html',
  styleUrls: ['./simulate-op.page.scss'],
})
export class SimulateOpPage implements OnInit {
  credit: Credit = new Credit('5000', '12', '498.2', '71.6', '498.2', new UserData('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''), '', '', '');
  new: any;

  path: string;
  constructor(private creditService: CreditServices, private router: Router) {
    this.credit.taux = '5.5';
    this.creditService.calculMensualite(this.credit).subscribe(data => {
      this.credit = data;
    });
  }

  ngOnInit() {
    var update = null;
    this.path = this.router.url;
    if (this.path.split('/')[2] != undefined) {
      this.new = this.path.split('/')[2];
      if (this.new == 'update') {
        this.creditService.getById(this.creditService.id).subscribe(data => {
          this.credit = data;
        }, err => {
        })
      }
    }
  }

  CapitalNgModelChange(value) {
    this.creditService.calculMensualite(this.credit).subscribe(data => {
      this.credit = data;
      var temp: string;
      if (this.credit.minMensualite > this.credit.maxMensualite) {
        temp = this.credit.minMensualite;
        this.credit.minMensualite = this.credit.maxMensualite;
        this.credit.maxMensualite = temp;
      }
      document.getElementById("mensualite").setAttribute("min", this.credit.minMensualite);
      document.getElementById("mensualite").setAttribute("max", this.credit.maxMensualite);
    }, err => { });
  }

  DureeNgModelChange(value) {
    this.creditService.calculMensualite(this.credit).subscribe(data => {
      this.credit = data;
      var temp: string;
      if (this.credit.minMensualite > this.credit.maxMensualite) {
        temp = this.credit.minMensualite;
        this.credit.minMensualite = this.credit.maxMensualite;
        this.credit.maxMensualite = temp;
      }
      document.getElementById("mensualite").setAttribute("min", this.credit.minMensualite);
      document.getElementById("mensualite").setAttribute("max", this.credit.maxMensualite);
    }, err => { });
  }
  MensualiteNgModelChange(value) {
    this.creditService.calculDuree(this.credit).subscribe(data => {
      this.credit = data;
    }, err => { });
  }

  onSubmitResult() {
    this.creditService.setResult(this.credit);
    if (this.path.split('/')[2] != undefined) {
      if (this.new == 'new')
        this.router.navigateByUrl('simulate-res/new')
      else if (this.new == 'update') {
        this.router.navigateByUrl('simulate-res/update');
      }
    }
    else this.router.navigateByUrl('simulate-res');
  }
}