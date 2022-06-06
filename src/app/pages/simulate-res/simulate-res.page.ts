import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credit } from 'src/app/models/credit/credit';
import { AuthService } from 'src/app/services/auth.service';
import { CamundaBPMService } from 'src/app/services/camunda-bpm.service';
import { CreditServices } from 'src/app/services/credit-services';

@Component({
  selector: 'app-simulate-res',
  templateUrl: './simulate-res.page.html',
  styleUrls: ['./simulate-res.page.scss'],
})
export class SimulateResPage implements OnInit {
  credit:Credit;
  new:any;
  updateres:any;
  path:string;

  constructor(private auth:AuthService,
    public camudaservice:CamundaBPMService,
    private creditService: CreditServices,private router:Router) {
        this.credit=this.creditService.getResult();
    }

  ngOnInit() {
    this.path=this.router.url;
    this.updateres=this.path.split('/')[2];
    if(this.updateres!=undefined)
      this.new=this.path.split('/')[2];
    setTimeout(data=>{
      document.getElementById("capital_res").setAttribute("value",this.credit.capital);
      document.getElementById("duree_res").setAttribute("value",this.credit.duree);
      document.getElementById("mensualite_res").setAttribute("value",this.credit.mensualite);
      document.getElementById("taux_res").setAttribute("value",this.credit.taux);
    },1000);
  }

  add(){
    this.auth.findByEmailpost(this.auth.getUser().email).subscribe(data =>{
      this.credit.user=data;
      this.creditService.add(this.credit).subscribe(data =>{
        this.credit=data
        this.camudaservice.startProcess(this.credit).subscribe(
          res =>{
            this.credit=res;
            //alert(this.credit.taskId);
            this.camudaservice.completeTaskOTP(this.credit.taskId,this.credit.id).subscribe(
              h=>{
                //alert("ok otp");
                this.credit=h;
                this.camudaservice.completeTaskScanDocs(90,this.credit.taskId,this.credit.id).subscribe(
                  g=>{
                    //alert("ok ocr");
                    if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
                          localStorage.setItem("url","okUp");
                          this.router.navigateByUrl('decision');
                    //this.router.navigate(["/decision/okUp"]);
                  },
                  gg=>{}//console.error(gg)}
                )
              },
              he=>{}
            )
            },
          fal =>{}
        );
        
      },err =>{
        if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
                          localStorage.setItem("url","opsUp");
                          this.router.navigateByUrl('decision');
        //this.router.navigate(["/decision/opsUp"]);
      })      
    },err =>{})  
  }

  update(){
    this.creditService.update(this.credit,this.creditService.id).subscribe(data =>{
      if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
      localStorage.setItem("url","okUp");
      this.router.navigateByUrl('decision');
      //this.router.navigate(["/decision/okUp"]);
    },err =>{
      if(localStorage.getItem("url")!=null) localStorage.removeItem("url");
      localStorage.setItem("url","opsUp");
      this.router.navigateByUrl('decision');
      //this.router.navigate(["/decision/opsUp"]);
    }) 
  }

  onClickAdd(){
    this.creditService.setResult(this.credit);
    this.router.navigateByUrl('personalinfos')
  }
}
