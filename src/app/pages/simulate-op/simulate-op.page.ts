import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credit } from 'src/app/models/credit';
import { CreditService } from 'src/app/services/credit.service';
import { LoadService } from 'src/app/services/load.service';
import { SimulationService } from 'src/app/services/simulation.service';

@Component({
  selector: 'app-simulate-op',
  templateUrl: './simulate-op.page.html',
  styleUrls: ['./simulate-op.page.scss'],
})
export class SimulateOpPage implements OnInit {
  credit: Credit = new Credit();
  new: any;

  path: string;
  constructor(private loadService: LoadService, private creditService: CreditService, private simulationService: SimulationService, private router: Router) {
    this.credit.capital = '5000';
    this.credit.taux = '5.5';
    this.credit.duree = '12';
    this.credit.minMensualite = '71.6';
    this.credit.maxMensualite = '498.2';
    this.simulationService.calculMensualite(this.credit).subscribe(data => {
      localStorage.setItem('currentCredit', JSON.stringify(data));
      this.credit = data;
    });
  }

  ngOnInit() {
    var update = null;
    this.path = this.router.url;
    if (this.path.split('/')[2] != undefined) {
      this.new = this.path.split('/')[2];
      if (this.new == 'update') {
        this.creditService.getById(this.credit.id).subscribe(data => {
          this.credit = data;
        }, err => {
        })
      }
    }
  }

  CapitalNgModelChange(value) {
    this.simulationService.calculMensualite(this.credit).subscribe(data => {
      localStorage.setItem('currentCredit', JSON.stringify(data));
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
    this.simulationService.calculMensualite(this.credit).subscribe(data => {
      localStorage.setItem('currentCredit', JSON.stringify(data));
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
    this.credit = JSON.parse(localStorage.getItem('credit'));
    this.credit.mensualite = value;
    console.log(this.credit);
    this.simulationService.calculDuree(this.credit).subscribe(data => {
      localStorage.setItem('currentCredit', JSON.stringify(data));
      this.credit = data;
    }, err => { });
  }

  onSubmitResult() {
    this.simulationService.setResult(this.loadService.loadCredit());
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