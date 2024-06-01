import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Transfer } from '../models/transfer.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

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

  list(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(`${environment.url_ms_negocio}/transfers`, { headers: this.getHeaders() });
  }
  view(id:number):Observable<Transfer>{
    return this.http.get<Transfer>(`${environment.url_ms_negocio}/transfers/${id}`, { headers: this.getHeaders() }
    );
  }
  create(theTransfer:Transfer):Observable<Transfer>{
    return this.http.post<Transfer>(`${environment.url_ms_negocio}/transfers/`, theTransfer, { headers: this.getHeaders() }
    );
  }
  update(theTransfer:Transfer):Observable<Transfer>{
    return this.http.put<Transfer>(`${environment.url_ms_negocio}/transfers/${theTransfer.id}`, theTransfer, { headers: this.getHeaders() }
    );
  }
  delete(id:number){
    return this.http.delete<Transfer>(`${environment.url_ms_negocio}/transfers/${id}`, { headers: this.getHeaders() }
    );
  }
}
