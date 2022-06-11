import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Email } from '../models/email';
import { User } from '../models/user';
import { LoadService } from './load.service';

let API_EMAIL_URL = environment.apiBaseUrl + "/api/email/";
let API_URL = environment.apiBaseUrl + "/api/user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail: Email = new Email();
  constructor(private http: HttpClient, private router: Router, private loadService: LoadService) { }

  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "all",
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  login(user: User): Observable<any> {
    // this.userEmail.email=user.email;
    return this.http.post(API_URL + 'login_app', JSON.stringify(user),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } }).pipe(catchError(this.handleError));
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      //console.error('An error occurred:', httpError.error.message);
    } else {
      // console.error(
      //   `Backend returned code ${httpError.status}, ` +
      //   `body was: ${httpError.error}`);
    }
    return throwError(httpError.error);
  }

  changePassword(user: User): Observable<any> {
    return this.http.put(API_URL + 'changePassword/' + user.email, user.password,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  registration(user: User): Observable<any> {
    if (user.sexe == "homme") {
      user.sexe = "true";
    } else {
      user.sexe = "false";
    }

    user.date_validite_cin = user.date_naissance;
    user.lieu_naissance = user.address.trim();
    user.username = user.email.split("@")[0].trim();
    user.password = user.lastName.toLocaleLowerCase().trim();
    localStorage.setItem('currentPassword', JSON.stringify(this.loadService.encrypted(user.password)));

    return this.http.post(API_URL + 'registration', JSON.stringify(user),
      { headers: { "Content-Type": "application/json; charset=UTF-8" } });
  }

  sendOTP(userEmail: Email): Observable<any> {
    return this.http.post(API_EMAIL_URL + 'sendOTP', JSON.stringify(userEmail),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  verifyOTP(otp: number, email: string): Observable<any> {
    return this.http.get(API_EMAIL_URL + 'verifyOTP/' + email + '/' + otp,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') }, observe: 'response' as 'response' })
  }

  createPassword(email: string, password: string): Observable<any> {
    const json = '{ "email": "' + email + '", "password": "' + password + '"} ';
    console.log(json);
    const obj = JSON.parse(json);

    return this.http.put(API_URL + 'createPassword', obj,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  findByEmailpost(email: string): Observable<any> {
    return this.http.get(API_URL + 'findByEmail/' + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') }, observe: 'response' as 'response' })
  }

  deleteByEmail(email: string): Observable<any> {
    return this.http.delete(API_URL + 'delete/' + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') }, observe: 'response' as 'response' })
  }

  deletebyid(id: number): Observable<any> {
    return this.http.delete(API_URL + 'deletebyid/' + id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') }, observe: 'response' as 'response' })
  }
  getUserData() {
    return this.http.put(API_URL + 'getUserData/' + 'lolo2000tototata@gmail.com',
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  updateUser(id: string, user: User) {
    return this.http.put(API_URL + 'update/' + id, user,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    // localStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  sendEmail(userEmail: Email): Observable<any> {
    return this.http.post(API_EMAIL_URL + 'sendEmail', JSON.stringify(userEmail),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  sendEmailToAdmin(userEmail: Email): Observable<any> {
    return this.http.post(API_EMAIL_URL + 'sendEmailToAdmin', JSON.stringify(userEmail),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }
}
