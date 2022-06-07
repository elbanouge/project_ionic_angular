import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credit } from '../models/credit';
import { User } from '../models/user';

let API_URL = environment.apiBaseUrl + "/api/process/";
//let API_URL_task="http://localhost:8070/engine-rest/task?processDefinitionKey=credit_request"

@Injectable({
  providedIn: 'root'
})
export class CamundaBPMService {

  constructor(private http: HttpClient) { }

  startProcess(user: User): Observable<any> {
    return this.http.post(API_URL + "start-process", JSON.stringify(user),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  getTaskId(id: string, processInstanceId: string): Observable<any> {
    //alert(user.firstName);
    return this.http.get(API_URL + "info-task-instance/" + id + "/" + processInstanceId,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  completeTaskOTP(user: User, taskId: string): Observable<any> {
    return this.http.post(API_URL + "complete-task-otp-motPass?taskId=" + taskId, JSON.stringify(user),
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  completeTaskScanDocs(fiabilite: number, taskId: string, id: number): Observable<any> {
    return this.http.post(API_URL + "complete-task-scan-docs?taskId=" + taskId + "&fiabilite=" + fiabilite, id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  //complete_Task_Ver_Man_Docs?taskId=ced41be2-dc59-11ec-b82f-00216afe58e9&verifierMan=false
  completeTaskVerManDocs(verifierMan: string, taskId: string, id: number): Observable<any> {
    return this.http.post(API_URL + "complete_Task_Ver_Man_Docs?taskId=" + taskId + "&verifierMan=" + verifierMan, id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

  completeTaskEntretienClient(taskId: string, id: number): Observable<any> {
    return this.http.post(API_URL + "complete_Task_Entretien_Client?taskId=" + taskId, id,
      { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') } });
  }

} 
