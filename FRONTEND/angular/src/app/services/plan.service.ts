import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from '../models/plan.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  list(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${environment.url_ms_negocio}/plans`);
  }
  view(id:number):Observable<Plan>{
    return this.http.get<Plan>(`${environment.url_ms_negocio}/plans/${id}`,
    );
  }
  create(thePlan:Plan):Observable<Plan>{
    return this.http.post<Plan>(`${environment.url_ms_negocio}/plans/`, thePlan,
    );
  }
  update(thePlan:Plan):Observable<Plan>{
    return this.http.put<Plan>(`${environment.url_ms_negocio}/plans/${thePlan.id}`, thePlan,
    );
  }
  delete(id:number){
    return this.http.delete<Plan>(`${environment.url_ms_negocio}/plans/${id}`,
    );
  }
}
