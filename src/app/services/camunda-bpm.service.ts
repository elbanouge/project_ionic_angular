import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credit } from '../models/credit/credit';

let API_URL = environment.apiBaseUrl + "/api/process/";
//let API_URL_task="http://localhost:8070/engine-rest/task?processDefinitionKey=credit_request"

@Injectable({
  providedIn: 'root'
})
export class CamundaBPMService {

  constructor(private http: HttpClient) { }

  startProcess(credit: Credit): Observable<any> {
    //alert(user.firstName);
    return this.http.post(API_URL + "start-process", JSON.stringify(credit),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  processDefinitionKey(id: number, processInstanceId: string): Observable<any> {
    //alert(user.firstName);
    return this.http.get(API_URL + "info-task-instance/" + id + "?processInstanceId=" + processInstanceId,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  completeTaskOTP(taskId: string, id: number): Observable<any> {
    return this.http.post(API_URL + "complete-task-otp-motPass?taskId=" + taskId, id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  completeTaskScanDocs(fiabilite: number, taskId: string, id: number): Observable<any> {
    return this.http.post(API_URL + "complete-task-scan-docs?taskId=" + taskId + "&fiabilite=" + fiabilite, id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  //complete_Task_Ver_Man_Docs?taskId=ced41be2-dc59-11ec-b82f-00216afe58e9&verifierMan=false
  completeTaskVerManDocs(verifierMan: string, taskId: string, id: number): Observable<any> {
    return this.http.post(API_URL + "complete_Task_Ver_Man_Docs?taskId=" + taskId + "&verifierMan=" + verifierMan, id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

  completeTaskEntretienClient(taskId: string, id: number): Observable<any> {
    return this.http.post(API_URL + "complete_Task_Entretien_Client?taskId=" + taskId, id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') } });
  }

} 
