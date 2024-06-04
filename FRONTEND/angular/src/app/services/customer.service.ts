import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

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

  list(): Observable<Customer[]> {
    console.log(this.token);
    return this.http.get<Customer[]>(`${environment.url_ms_negocio}/customers`, { headers: this.getHeaders()});
  }
  view(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${environment.url_ms_negocio}/customers/${id}`, { headers: this.getHeaders() });
  }
  create(theCustomer:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${environment.url_ms_negocio}/customers`, theCustomer, { headers: this.getHeaders() }
    );
  }
  update(theCustomer:Customer):Observable<Customer>{
    return this.http.put<Customer>(`${environment.url_ms_negocio}/customers/${theCustomer.id}`, theCustomer, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<Customer>(`${environment.url_ms_negocio}/customers/${id}`, { headers: this.getHeaders()}
    );
  }
}
