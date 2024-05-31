import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicePlan } from '../models/service-plan.model';

@Injectable({
  providedIn: 'root'
})
export class ServicePlanService {

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

  list(): Observable<ServicePlan[]> {
    return this.http.get<ServicePlan[]>(`${environment.url_ms_negocio}/servicesplans`, { headers: this.getHeaders() });
  }
  view(id:number):Observable<ServicePlan>{
    return this.http.get<ServicePlan>(`${environment.url_ms_negocio}/servicesplans/${id}`, { headers: this.getHeaders() }
    );
  }
  create(theServicePlan:ServicePlan):Observable<ServicePlan>{
    return this.http.post<ServicePlan>(`${environment.url_ms_negocio}/servicesplans/`, theServicePlan, { headers: this.getHeaders() }
    );
  }
  update(theServicePlan:ServicePlan):Observable<ServicePlan>{
    return this.http.put<ServicePlan>(`${environment.url_ms_negocio}/servicesplans/${theServicePlan.id}`, theServicePlan, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<ServicePlan>(`${environment.url_ms_negocio}/servicesplans/${id}`, { headers: this.getHeaders() }
    );
  }
}
