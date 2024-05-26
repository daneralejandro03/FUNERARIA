import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Administrator } from '../models/administrator.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

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

  list(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(`${environment.url_ms_negocio}/administrators`, { headers: this.getHeaders()});
  }
  view(id:number):Observable<Administrator>{
    return this.http.get<Administrator>(`${environment.url_ms_negocio}/administrators/${id}`, { headers: this.getHeaders() });
  }
  create(theAdministrator:Administrator):Observable<Administrator>{
    return this.http.post<Administrator>(`${environment.url_ms_negocio}/administrators`, theAdministrator, { headers: this.getHeaders() }
    );
  }
  update(theAdministrator:Administrator):Observable<Administrator>{
    return this.http.put<Administrator>(`${environment.url_ms_negocio}/administrators/${theAdministrator.id}`, theAdministrator, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<Administrator>(`${environment.url_ms_negocio}/administrators/${id}`, { headers: this.getHeaders() }
    );
  }
}
