import { Injectable } from '@angular/core';


export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {


  constructor() { }


}