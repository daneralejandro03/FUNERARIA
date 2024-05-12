import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Owner } from '../models/owner.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  private token = environment.token;
  
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });

  list(): Observable<Owner[]> {
    return this.http.get<Owner[]>(`${environment.url_ms_negocio}/owners`, { headers: this.headers});
  }
  view(id:number):Observable<Owner>{
    return this.http.get<Owner>(`${environment.url_ms_negocio}/owners/${id}`, { headers: this.headers });
  }
  create(theOwner:Owner):Observable<Owner>{
    return this.http.post<Owner>(`${environment.url_ms_negocio}/owners/`, theOwner,
    );
  }
  update(theOwner:Owner):Observable<Owner>{
    return this.http.put<Owner>(`${environment.url_ms_negocio}/owners/${theOwner.id}`, theOwner,
    );
  }

  delete(id:number){
    return this.http.delete<Owner>(`${environment.url_ms_negocio}/owners/${id}`,
    );
  }
}
