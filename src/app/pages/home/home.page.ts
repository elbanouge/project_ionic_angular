import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CreditServices } from 'src/app/services/credit-services';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  count:number;
  constructor(private creditservice:CreditServices,
    private authservice:AuthService) { }

    async ngOnInit() {
    this.creditservice.getnombreCredit(this.authservice.getUser().email).subscribe(data =>{
      this.count=data;
    },err =>{
      
    }) ;
  }
  beenClicked: boolean = false;

  async refresh(){
    this.creditservice.getnombreCredit(this.authservice.getUser().email).subscribe(data =>{
      this.count=data;
    },err =>{
      
    }) ;
  }
}