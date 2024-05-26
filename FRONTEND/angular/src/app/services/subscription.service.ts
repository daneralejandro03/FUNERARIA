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

  constructor(private http: HttpClient,
              private theSecutityService: SecurityService
  ) { console.log(this.theSecutityService.getSessionData());}

  private token = this.theSecutityService.getSessionData();
  
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });

  list(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${environment.url_ms_negocio}/subscriptions`, { headers: this.headers });
  }
  view(id:number):Observable<Subscription>{
    return this.http.get<Subscription>(`${environment.url_ms_negocio}/subscriptions/${id}`, { headers: this.headers },
    );
  }
  create(theSubscription:Subscription):Observable<Subscription>{
    return this.http.post<Subscription>(`${environment.url_ms_negocio}/subscriptions/`, theSubscription,
    );
  }
  update(theSubscription:Subscription):Observable<Subscription>{
    return this.http.put<Subscription>(`${environment.url_ms_negocio}/subscriptions/${theSubscription.id}`, theSubscription,
    );
  }

  delete(id:number){
    return this.http.delete<Subscription>(`${environment.url_ms_negocio}/subscriptions/${id}`,
    );
  }
}
