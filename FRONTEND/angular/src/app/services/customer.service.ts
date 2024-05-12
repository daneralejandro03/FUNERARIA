import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private token = environment.token;
  
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });

  list(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.url_ms_negocio}/customers`, { headers: this.headers});
  }
  view(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${environment.url_ms_negocio}/customers/${id}`, { headers: this.headers });
  }
  create(theCustomer:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${environment.url_ms_negocio}/customers/`, theCustomer,
    );
  }
  update(theCustomer:Customer):Observable<Customer>{
    return this.http.put<Customer>(`${environment.url_ms_negocio}/customers/${theCustomer.id}`, theCustomer,
    );
  }

  delete(id:number){
    return this.http.delete<Customer>(`${environment.url_ms_negocio}/Customers/${id}`,
    );
  }
}
