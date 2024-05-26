import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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

  list(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.url_ms_negocio}/employees`, { headers: this.getHeaders()});
  }
  view(id:number):Observable<Employee>{
    return this.http.get<Employee>(`${environment.url_ms_negocio}/employees/${id}`, { headers: this.getHeaders() });
  }
  create(theEmployee:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${environment.url_ms_negocio}/employees`, theEmployee, { headers: this.getHeaders() }
    );
  }
  update(theEmployee:Employee):Observable<Employee>{
    return this.http.put<Employee>(`${environment.url_ms_negocio}/employees/${theEmployee.id}`, theEmployee, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<Employee>(`${environment.url_ms_negocio}/employees/${id}`, { headers: this.getHeaders() }
    );
  }
}
