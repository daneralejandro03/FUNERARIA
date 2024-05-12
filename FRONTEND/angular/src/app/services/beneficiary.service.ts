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

  private token = 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjp7Il9pZCI6IjY1ZTA5NGE3OWQ5ZjM1MGJiY2E0OGFkOSIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZGVzY3JpcHRpb24iOiJFc3RhIGVzIHVuYSBkZXNjcmlwY2nDs24ifSwiaWRlbnRpZmljYXRpb25DYXJkIjoiMTA1Mzg2OTY0OSIsIm5hbWUiOiJKYWltZSBBbmRyZXMgQ2FyZG9uYSBEaWF6IiwiX2lkIjoiNjVmN2E3Y2JlN2JkN2I1YmE1ODU0MTc1IiwiZW1haWwiOiJqYWNkOTlAaG90bWFpbC5jb20iLCJzdWIiOiJKYWltZSBBbmRyZXMgQ2FyZG9uYSBEaWF6IiwiaWF0IjoxNzE1NTMzNjUyLCJleHAiOjE3MTU1MzcyNTJ9.7Ssrbxnpj_PF5iFUbqaJOW-H0MnDWAm0o56rvvPvw8grDurhrC2DKnyXOH4LWm6Y7vZB5WMyzTm1MYAVuA_ZmA'
  
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
