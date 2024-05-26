import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { environment } from 'src/environments/environment';
import { Pay } from '../models/pay.model';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http: HttpClient,
    private theSecutityService: SecurityService
) { console.log(this.theSecutityService.getSessionData());}

private token = this.theSecutityService.getSessionData();

private headers = new HttpHeaders({
'Authorization': 'Bearer ' + this.token
});

list(): Observable<Pay[]> {
return this.http.get<Pay[]>(`${environment.url_ms_negocio}/pays`, { headers: this.headers });
}
view(id:number):Observable<Pay>{
return this.http.get<Pay>(`${environment.url_ms_negocio}/pays/${id}`, { headers: this.headers },
);
}
create(thePay:Pay):Observable<Pay>{
return this.http.post<Pay>(`${environment.url_ms_negocio}/pays/`, thePay,
);
}
update(thePay:Pay):Observable<Pay>{
return this.http.put<Pay>(`${environment.url_ms_negocio}/pays/${thePay.id}`, thePay,
);
}

delete(id:number){
return this.http.delete<Pay>(`${environment.url_ms_negocio}/pays/${id}`,
);
}
}
