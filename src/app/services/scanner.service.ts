import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OCR } from "../models/ocr";

let API_URL = environment.apiBaseUrl + "/api/ocr/";

@Injectable({
    providedIn: 'root'
})

export class ScannerService {
    constructor(private http: HttpClient) { }

    scanCINRecto(ocr: OCR): Observable<any> {
        return this.http.post(API_URL + 'OCR_NEW_CIN_Recto', JSON.stringify(ocr),
            { headers: { "Content-Type": "application/json; charset=UTF-8", "Authorization": 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') }, responseType: 'text' });
    }

    scanCINVerso(ocr: OCR): Observable<any> {
        return this.http.post(API_URL + 'OCR_NEW_CIN_Verso', JSON.stringify(ocr),
            { headers: { "Content-Type": "application/json; charset=UTF-8", "Authorization": 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') }, responseType: 'text' });
    }
}