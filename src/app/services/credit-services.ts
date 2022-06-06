import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credit } from '../models/credit/credit';

let API_URL = environment.apiBaseUrl + "/api/credit/";
let API_URL2 = environment.apiBaseUrl + "/api/simulation/";

@Injectable({
  providedIn: 'root'
})
export class CreditServices {
  result: Credit;
  id: number;
  //userEmail:Email=new Email();
  constructor(private http: HttpClient) { }

  calculMensualite(credit: Credit): Observable<any> {
    return this.http.post(API_URL2 + "calculMensualite", JSON.stringify(credit),
      { headers: { "Content-Type": "application/json; charset=UTF-8" } });
  }
  calculDuree(credit: Credit): Observable<any> {
    return this.http.post(API_URL2 + "calculDuree", JSON.stringify(credit),
      { headers: { "Content-Type": "application/json; charset=UTF-8" } });
  }

  setResult(result) {
    this.result = result;
  }
  getResult() {
    //this.result.user.email="sdadsda@dh.fgd";
    return this.result;
  }

  add(credit: Credit): Observable<any> {
    //this.userEmail.email=user.email;
    //credit.user.email="sdadsda@dh.fgd";
    return this.http.post(API_URL + 'add', JSON.stringify(credit),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  update(credit: Credit, id: number): Observable<any> {
    //this.userEmail.email=user.email;
    return this.http.put(API_URL + 'update/' + id, JSON.stringify(credit),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  delete(id: number): Observable<any> {
    //this.userEmail.email=user.email;
    return this.http.delete(API_URL + 'delete/' + id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  getAllCredit(): Observable<any> {
    return this.http.get(API_URL + "all",
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  getById(id: number): Observable<any> {
    return this.http.get(API_URL + "all/" + id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  getByemail(email: string): Observable<any> {
    return this.http.get(API_URL + "allcredit/" + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  getnombreCredit(email: string): Observable<any> {
    return this.http.get(API_URL + "getnombreCredit/" + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  getoneByemail(email: string): Observable<any> {
    return this.http.get(API_URL + "credit/" + email,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

}
