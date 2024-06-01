import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  list(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${environment.url_ms_negocio}/notifications`);
  }
  view(id:number):Observable<Notification>{
    return this.http.get<Notification>(`${environment.url_ms_negocio}/notifications/${id}`,
    );
  }
  create(theNotification:Notification):Observable<Notification>{
    return this.http.post<Notification>(`${environment.url_ms_negocio}/notifications/`, theNotification,
    );
  }
  update(theNotification:Notification):Observable<Notification>{
    return this.http.put<Notification>(`${environment.url_ms_negocio}/notifications/${theNotification.id}`, theNotification,
    );
  }
  delete(id:number){
    return this.http.delete<Notification>(`${environment.url_ms_negocio}/notifications/${id}`,
    );
  }
}
