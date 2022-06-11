import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userModel = new User();
  errorMessageMail: string;
  errorpassword: string;
  chip: any;
  @ViewChild("userlogin", { static: false }) userlogin: NgForm;
  @ViewChild("icon", { static: true }) icon: HTMLIonIconElement;
  constructor(private router: Router, private authService: AuthService) {
  }
  ngOnInit() {
    this.chip = document.getElementById("chip");
  }

  appearOrNot() {
    let password = document.getElementById("password");
    let type = password.getAttribute("type");
    if (type == "password") {
      password.setAttribute("type", "text");
      this.icon.name = "eye-off";
    }
    else {
      password.setAttribute("type", "password");
      this.icon.name = "eye-outline";
    }
  }

  onSubmit() {
    if (this.userModel.email == "") {
      if (this.userModel.password == "") {
        this.chip.style.display = "none";
        this.errorpassword = "Veuillez saisir tous les champs !";
        this.chip.style.display = "block";
      }
      else {
        this.chip.style.display = "none";
        this.errorpassword = "Veuillez saisir ton email !";
        this.chip.style.display = "block";
      }
    }
    else {
      if (this.userModel.password == "") {
        this.chip.style.display = "none";
        this.errorpassword = "Veuillez saisir ton mot de passe !";
        this.chip.style.display = "block";
      }
      else {
        this.authService.login(this.userModel).subscribe(data => {
          this.userlogin.reset();
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.router.navigateByUrl('home/profile');
        }, err => {
          if (err == "email") {
            this.chip.style.display = "none";
            this.chip.style.display = "block";
            this.errorpassword = "Email Incorrect!";
          }
          else if (err == "password") {
            this.chip.style.display = "none";
            this.errorpassword = "Mot de passe Incorrect!";
            this.chip.style.display = "block";
          }
        });
      }
    }
  }

  ionChange() {
    this.chip = document.getElementById("chip");
    this.closeChip();
    this.errorpassword = "";
  }

  closeChip() {
    this.chip.style.display = "none";
  }
}