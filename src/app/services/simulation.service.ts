import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Credit } from "../models/credit";

let API_URL = environment.apiBaseUrl + "/api/simulation/";

@Injectable({
    providedIn: 'root'
})
export class SimulationService {
    result: Credit;

    constructor(private http: HttpClient) { }

    setResult(result) {
        this.result = result;
    }
    getResult() {
        return this.result;
    }

    calculMensualite(credit: Credit): Observable<any> {
        return this.http.post(API_URL + "calculMensualite", JSON.stringify(credit),
            { headers: { "Content-Type": "application/json; charset=UTF-8" } });
    }
    calculDuree(credit: Credit): Observable<any> {
        return this.http.post(API_URL + "calculDuree", JSON.stringify(credit),
            { headers: { "Content-Type": "application/json; charset=UTF-8" } });
    }
}