import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from '../models/beneficiary.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private http: HttpClient) { }

  private token = environment.token
  
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });

  list(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${environment.url_ms_negocio}/beneficiaries`, { headers: this.headers });
  }
  view(id:number):Observable<Beneficiary>{
    return this.http.get<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${id}`, { headers: this.headers },
    );
  }
  create(theBeneficiary:Beneficiary):Observable<Beneficiary>{
    return this.http.post<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/`, theBeneficiary,
    );
  }
  update(theBeneficiary:Beneficiary):Observable<Beneficiary>{
    return this.http.put<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${theBeneficiary.id}`, theBeneficiary,
    );
  }

  delete(id:number){
    return this.http.delete<Beneficiary>(`${environment.url_ms_negocio}/beneficiaries/${id}`,
    );
  }

}
