import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

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

  list(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${environment.url_ms_negocio}/incidents`, { headers: this.getHeaders() });
  }
  view(id:number):Observable<Incident>{
    return this.http.get<Incident>(`${environment.url_ms_negocio}/incidents/${id}`, { headers: this.getHeaders() }
    );
  }
  create(theIncident:Incident):Observable<Incident>{
    return this.http.post<Incident>(`${environment.url_ms_negocio}/incidents/`, theIncident, { headers: this.getHeaders() }
    );
  }
  update(theIncident:Incident):Observable<Incident>{
    return this.http.put<Incident>(`${environment.url_ms_negocio}/incidents/${theIncident.id}`, theIncident, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<Incident>(`${environment.url_ms_negocio}/incidents/${id}`, { headers: this.getHeaders() }
    );
  }
}
