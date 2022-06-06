import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Email } from '../models/email/email';
import { UserData } from '../models/user/user-data';


let API_EMAIL_URL = environment.apiBaseUrl + "/api/email/";
let API_URL = environment.apiBaseUrl + "/api/user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userEmail: Email = new Email();
  constructor(private http: HttpClient, private router: Router) { }

  register(user: UserData): Observable<any> {
    return this.http.post(API_URL + 'registration', JSON.stringify(user),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  findAllUsers(): Observable<any> {
    return this.http.get(API_URL + "all",
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  login(user: UserData): Observable<any> {
    // this.userEmail.email=user.email;
    return this.http.post(API_URL + 'login', JSON.stringify(user),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } }).pipe(catchError(this.handleError));
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

  changePassword(user: UserData): Observable<any> {
    return this.http.put(API_URL + 'changePassword/' + user.email, user.password,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  Personalinfos(user: UserData): Observable<any> {
    // this.userEmail.email=user.email;
    return this.http.post(API_URL + 'Personalinfos', JSON.stringify(user),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  sendOTP(userEmail: Email): Observable<any> {
    return this.http.post(API_EMAIL_URL + 'sendOTP', JSON.stringify(userEmail),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  verifyOTP(otp: number): Observable<any> {
    return this.http.post(API_EMAIL_URL + 'verifyOTP', JSON.stringify(otp),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') }, observe: 'response' as 'response' })
  }

  createPassword(email: string, password: string): Observable<any> {
    return this.http.put(API_URL + 'createPassword/' + email, password,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  findByEmailpost(email: string): Observable<any> {
    return this.http.post(API_URL + 'findByEmail/' + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') }, observe: 'response' as 'response' })
  }

  deleteByEmail(email: string): Observable<any> {
    return this.http.delete(API_URL + 'delete/' + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') }, observe: 'response' as 'response' })
  }
  //deletebyid
  deletebyid(id: number): Observable<any> {
    return this.http.delete(API_URL + 'deletebyid/' + id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') }, observe: 'response' as 'response' })
  }
  getUserData() {
    return this.http.put(API_URL + 'getUserData/' + 'lolo2000tototata@gmail.com',
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  updateUser(email: string, user: UserData) {
    return this.http.put(API_URL + 'update/' + email, user,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    //console.log(localStorage.getItem("user"));
    localStorage.clear();
    //console.log(localStorage.getItem("user"));
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  sendEmail(userEmail: Email): Observable<any> {
    return this.http.post(API_EMAIL_URL + 'sendEmail', JSON.stringify(userEmail),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  sendEmailToAdmin(userEmail: Email): Observable<any> {
    return this.http.post(API_EMAIL_URL + 'sendEmailToAdmin', JSON.stringify(userEmail),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }
}
