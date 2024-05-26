import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription.model';
import { environment } from 'src/environments/environment';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

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

  list(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${environment.url_ms_negocio}/subscriptions`, { headers: this.getHeaders() });
  }
  view(id:number):Observable<Subscription>{
    return this.http.get<Subscription>(`${environment.url_ms_negocio}/subscriptions/${id}`, { headers: this.getHeaders() }
    );
  }
  create(theSubscription:Subscription):Observable<Subscription>{
    return this.http.post<Subscription>(`${environment.url_ms_negocio}/subscriptions/`, theSubscription, { headers: this.getHeaders() }
    );
  }
  update(theSubscription:Subscription):Observable<Subscription>{
    return this.http.put<Subscription>(`${environment.url_ms_negocio}/subscriptions/${theSubscription.id}`, theSubscription, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<Subscription>(`${environment.url_ms_negocio}/subscriptions/${id}`, { headers: this.getHeaders() }
    );
  }
}
