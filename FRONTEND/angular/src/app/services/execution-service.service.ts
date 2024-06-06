import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { ExecutionServices } from '../models/execution-services.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExecutionServiceService {

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

  list(): Observable<ExecutionServices[]> {
    return this.http.get<ExecutionServices[]>(`${environment.url_ms_negocio}/executionservices`, { headers: this.getHeaders() });
  }
  view(id:number):Observable<ExecutionServices>{
    return this.http.get<ExecutionServices>(`${environment.url_ms_negocio}/executionservices/${id}`, { headers: this.getHeaders() }
    );
  }
  create(theExecutionService:ExecutionServices):Observable<ExecutionServices>{
    return this.http.post<ExecutionServices>(`${environment.url_ms_negocio}/executionservices/`, theExecutionService, { headers: this.getHeaders() }
    );
  }
  update(theExecutionService:ExecutionServices):Observable<ExecutionServices>{
    return this.http.put<ExecutionServices>(`${environment.url_ms_negocio}/executionservices/${theExecutionService.id}`, theExecutionService, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<ExecutionServices>(`${environment.url_ms_negocio}/executionservices/${id}`, { headers: this.getHeaders() }
    );
  }
}
