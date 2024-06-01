import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

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

  list(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.url_ms_negocio}/reports`, { headers: this.getHeaders() });
  }reports
  view(id:number):Observable<Report>{
    return this.http.get<Report>(`${environment.url_ms_negocio}/reports/${id}`, { headers: this.getHeaders() }
    );
  }
  create(theReport:Report):Observable<Report>{
    return this.http.post<Report>(`${environment.url_ms_negocio}/reports/`, theReport, { headers: this.getHeaders() }
    );
  }
  update(theReport:Report):Observable<Report>{
    return this.http.put<Report>(`${environment.url_ms_negocio}/reports/${theReport.id}`, theReport, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<Report>(`${environment.url_ms_negocio}/reports/${id}`, { headers: this.getHeaders() }
    );
  }
}
