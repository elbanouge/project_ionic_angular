
import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { IonAccordionGroup, ModalController, PickerController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private pickerController: PickerController,
    @Inject(LOCALE_ID) public locale: string,
    public formBuilder: FormBuilder,
    private authServices: AuthService,
    public modalController: ModalController,
    public toastController: ToastController) { }

  public user: User = new User();
  personInfo: NgForm;
  financialInfo: NgForm;
  count: number;
  personForm: FormGroup;
  moneyForm: FormGroup;
  submittedPersonForm = false;
  submittedMoneyForm = false;
  connection: boolean = true;
  // connection: boolean = false;
  list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  ngOnInit() {
    this.authServices.findByEmailpost(this.authServices.getUser().email).subscribe(data => {
      this.user = data.body;
      console.log(this.user);

      if (this.user.sexe == "false") {
        document.getElementsByClassName('sexe')[0].setAttribute("style", "--background:#370791;");
      }
      else {
        document.getElementsByClassName('sexe')[1].setAttribute("style", "--background:#370791;");
      }
      if (this.user.fonctionnaire == 'true') {
        document.getElementsByClassName('fonctionnaire')[0].setAttribute("style", "--background:#370791;");
      }
      else {
        document.getElementsByClassName('fonctionnaire')[1].setAttribute("style", "--background:#370791;");
      }
      if (this.user.client == 'true') {
        document.getElementsByClassName('client')[0].setAttribute("style", "--background:#370791;");
      }
      else {
        document.getElementsByClassName('client')[1].setAttribute("style", "--background:#370791;");
      }
    }, err => { });
  }

  logout() { this.authServices.logout(); }

  editOrSave(edit, save, function_name) {
    if (function_name == "edit") {
      edit.el.style.display = "none";
      save.el.style.display = "block";
      document.getElementById("cin").removeAttribute("disabled");
      document.getElementById("cin").style.color = "black";
      document.getElementById("lastName").removeAttribute("disabled");
      document.getElementById("lastName").style.color = "black";
      document.getElementById("firstName").removeAttribute("disabled");
      document.getElementById("firstName").style.color = "black";
      document.getElementById("email").removeAttribute("disabled");
      document.getElementById("email").style.color = "black";
      document.getElementById("phone").removeAttribute("disabled");
      document.getElementById("phone").style.color = "black";
      document.getElementById("address").removeAttribute("disabled");
      document.getElementById("address").style.color = "black";
      document.getElementById("nationalite").removeAttribute("disabled");
      document.getElementById("nationalite").style.color = "black";
      document.getElementById("mensuel").style.display = "none";
      document.getElementById("mensuel_select").style.color = "black";
      document.getElementById("mensuel_select").style.display = "block";
      document.getElementById("mensuel_select").style.maxWidth = "100%";
      document.getElementsByClassName("sexe")[0].removeAttribute("disabled");
      document.getElementsByClassName("sexe")[1].removeAttribute("disabled");
      document.getElementsByClassName("client")[0].removeAttribute("disabled");
      document.getElementsByClassName("client")[1].removeAttribute("disabled");
      document.getElementsByClassName("fonctionnaire")[0].removeAttribute("disabled");
      document.getElementsByClassName("fonctionnaire")[1].removeAttribute("disabled");
      document.getElementById("date_nai_text").style.display = "none";
      document.getElementById("date_nai_choose").style.display = "block";
    }
    else {
      this.authServices.updateUser(this.authServices.getUser().id, this.user).subscribe(data => {
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        edit.el.style.display = "block";
        save.el.style.display = "none";
        document.getElementById("cin").setAttribute("style", "color:#855fa0;");
        document.getElementById("cin").setAttribute("disabled", "disabled");
        document.getElementById("lastName").setAttribute("disabled", "true");
        document.getElementById("lastName").style.color = "#855fa0";
        document.getElementById("firstName").setAttribute("disabled", "true");
        document.getElementById("firstName").style.color = "#855fa0";
        document.getElementById("email").setAttribute("disabled", "true");
        document.getElementById("email").style.color = "#855fa0";
        document.getElementById("phone").setAttribute("disabled", "true");
        document.getElementById("phone").style.color = "#855fa0";
        document.getElementById("address").setAttribute("disabled", "true");
        document.getElementById("address").style.color = "#855fa0";
        document.getElementById("nationalite").setAttribute("disabled", "true");
        document.getElementById("nationalite").style.color = "#855fa0";
        document.getElementById("mensuel").setAttribute("disabled", "true");
        document.getElementById("mensuel").style.color = "#855fa0";
        document.getElementsByClassName("sexe")[0].setAttribute("disabled", "true");
        document.getElementsByClassName("sexe")[1].setAttribute("disabled", "true");
        document.getElementsByClassName("client")[0].setAttribute("disabled", "true");
        document.getElementsByClassName("client")[1].setAttribute("disabled", "true");
        document.getElementsByClassName("fonctionnaire")[0].setAttribute("disabled", "true");
        document.getElementsByClassName("fonctionnaire")[1].setAttribute("disabled", "true");
        document.getElementById("date_nai_text").style.display = "block";
        document.getElementById("date_nai_choose").style.display = "none";
        this.presentToast('Modification effectuée.', 'success');
      }, err => {
        this.presentToast('Modification échouée.', 'danger');
      });
    }
  }

  choose(event) {
    var src = event.srcElement;
    src.setAttribute("style", "--background:#370791");
    if (src.getAttribute("id") == "first")
      src.nextElementSibling.setAttribute("style", "--background:rgb(146, 157, 168)");
    else src.previousElementSibling.setAttribute("style", "--background:rgb(146, 157, 168)");
  }

  private selectedMonth: string;
  private selectedDay: string;
  private selectedYear: string;
  years: Array<Object> = new Array();
  months: Array<Object> = new Array();
  days: Array<Object> = new Array();
  getYears() {
    for (let i = 0; i < 44; i++) {
      this.years.push({ text: String(1960 + i), value: String(1960 + i) })
    }
    return this.years;
  }
  getMonths() {
    for (let i = 1; i < 13; i++) {
      this.months.push({ text: String(i), value: String(i) })
    }
    return this.months;
  }
  getDays() {
    for (let i = 1; i < 32; i++) {
      this.days.push({ text: String(i), value: String(i) })
    }
    return this.days;
  }
  async presentPicker() {
    const picker = await this.pickerController.create({
      backdropDismiss: false,
      buttons: [
        {
          text: 'ok',
          handler: (selected) => {
            this.selectedDay = selected.days.value;
            this.selectedMonth = selected.months.value;
            this.selectedYear = selected.years.value;
            this.user.date_naissance = this.selectedDay + "/" + this.selectedMonth + "/" + this.selectedYear;
          },
        }
      ],
      columns: [
        {
          name: 'days',
          options: this.getDays()
        },
        {
          name: 'months',
          options: this.getMonths()
        },
        {
          name: 'years',
          options: this.getYears()
        }
      ]
    });
    await picker.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
}
