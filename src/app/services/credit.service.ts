import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credit } from '../models/credit';
import { User } from '../models/user';
import { LoadService } from './load.service';

let API_URL = environment.apiBaseUrl + "/api/credit/";

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  id: number;

  constructor(private http: HttpClient, private loadService: LoadService) { }

  addCredit(credit: Credit): Observable<any> {
    let username = this.loadService.loadUsernameUser();
    return this.http.post(API_URL + 'createNewCredit/' + username, JSON.stringify(credit),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  add(credit: Credit, email: string): Observable<any> {
    let username = email.toLowerCase().split('@')[0];
    return this.http.post(API_URL + 'createNewCredit/' + username, JSON.stringify(credit),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }


  update(credit: Credit, id: number): Observable<any> {
    //this.userEmail.email=user.email;
    return this.http.put(API_URL + 'update/' + id, JSON.stringify(credit),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  delete(id: number): Observable<any> {
    //this.userEmail.email=user.email;
    return this.http.delete(API_URL + 'deleteCredit/' + id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  getAllCredit(): Observable<any> {
    return this.http.get(API_URL + "all",
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  getById(id: number): Observable<any> {
    return this.http.get(API_URL + "all/" + id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  getCreditsByUser(email: string): Observable<any> {
    return this.http.get(API_URL + "getCreditsByUser/" + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  getnombreCredit(email: string): Observable<any> {
    return this.http.get(API_URL + "getNumberOfCreditsByUser/" + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  getCreditByUser(email: string): Observable<any> {
    return this.http.get(API_URL + "getCreditByUser/" + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

}
