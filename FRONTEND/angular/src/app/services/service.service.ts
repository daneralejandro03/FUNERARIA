import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

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

  list(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.url_ms_negocio}/services`, { headers: this.getHeaders() });
  }
  view(id:number):Observable<Service>{
    return this.http.get<Service>(`${environment.url_ms_negocio}/services/${id}`, { headers: this.getHeaders() }
    );
  }
  create(theService:Service):Observable<Service>{
    return this.http.post<Service>(`${environment.url_ms_negocio}/services/`, theService, { headers: this.getHeaders() }
    );
  }
  update(theService:Service):Observable<Service>{
    return this.http.put<Service>(`${environment.url_ms_negocio}/services/${theService.id}`, theService, { headers: this.getHeaders() }
    );
  }
  delete(id:number){
    return this.http.delete<Service>(`${environment.url_ms_negocio}/services/${id}`, { headers: this.getHeaders() }
    );
  }
}
