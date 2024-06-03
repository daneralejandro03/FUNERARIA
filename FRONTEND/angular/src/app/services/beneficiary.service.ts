import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from '../models/beneficiary.model';
import { environment } from 'src/environments/environment';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  private token = "";

  constructor(private http: HttpClient,
              private theSecurityService: SecurityService) { 

                let sessionData = this.theSecurityService.getSessionData();
                if (sessionData) {
                  let sessionObject = JSON.parse(sessionData);
                  this.token = sessionObject.token;
                }
  }
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
  }

  list(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${environment.url_ms_negocio}/beneficiaries`, { headers: this.getHeaders() });
  }
  view(id:number):Observable<Beneficiary>{
    return this.http.get<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${id}`, { headers: this.getHeaders() },
    );
  }
  create(theBeneficiary:Beneficiary):Observable<Beneficiary>{
    return this.http.post<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/`, theBeneficiary, { headers: this.getHeaders() }
    );
  }
  update(theBeneficiary:Beneficiary):Observable<Beneficiary>{
    return this.http.put<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${theBeneficiary.id}`, theBeneficiary, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${id}`, { headers: this.getHeaders() }
    );
  }

}
