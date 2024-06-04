import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

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

  list(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.url_ms_negocio}/comments`, { headers: this.getHeaders() });
  }
  view(id:number):Observable<Comment>{
    return this.http.get<Comment>(`${environment.url_ms_negocio}/comments/${id}`, { headers: this.getHeaders() }
    );
  }
  create(theComment:Comment):Observable<Comment>{
    return this.http.post<Comment>(`${environment.url_ms_negocio}/comments/`, theComment, { headers: this.getHeaders() }
    );
  }
  update(theComment:Comment):Observable<Comment>{
    return this.http.put<Comment>(`${environment.url_ms_negocio}/comments/${theComment.id}`, theComment, { headers: this.getHeaders() }
    );
  }

  delete(id:number){
    return this.http.delete<Comment>(`${environment.url_ms_negocio}/comments/${id}`, { headers: this.getHeaders() }
    );
  }

}
