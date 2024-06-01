import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

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

  list(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${environment.url_ms_negocio}/plans`, { headers: this.getHeaders() });
  }
  view(id:number):Observable<Plan>{
    return this.http.get<Plan>(`${environment.url_ms_negocio}/plans/${id}`, { headers: this.getHeaders() }
    );
  }
  create(thePlan:Plan):Observable<Plan>{
    return this.http.post<Plan>(`${environment.url_ms_negocio}/plans/`, thePlan, { headers: this.getHeaders() }
    );
  }
  update(thePlan:Plan):Observable<Plan>{
    return this.http.put<Plan>(`${environment.url_ms_negocio}/plans/${thePlan.id}`, thePlan, { headers: this.getHeaders() }
    );
  }
  delete(id:number){
    return this.http.delete<Plan>(`${environment.url_ms_negocio}/plans/${id}`, { headers: this.getHeaders() }
    );
  }
}
