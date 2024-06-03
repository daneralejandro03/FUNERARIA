import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Owner } from '../models/owner.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

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

  list(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${environment.url_ms_negocio}/owners`, { headers: this.getHeaders()});
  }
  view(id:number):Observable<Owner>{
    return this.http.get<Owner>(`${environment.url_ms_negocio}/owners/${id}`, { headers: this.getHeaders() });
  }
  create(theOwner:Owner):Observable<Owner>{
    return this.http.post<Owner>(`${environment.url_ms_negocio}/owners/`, theOwner, { headers: this.getHeaders() }
    );
  }
  update(theOwner:Owner):Observable<Owner>{
    return this.http.put<Owner>(`${environment.url_ms_negocio}/owners/${theOwner.id}`, theOwner, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<Owner>(`${environment.url_ms_negocio}/owners/${id}`, { headers: this.getHeaders() }
    );
  }
}
