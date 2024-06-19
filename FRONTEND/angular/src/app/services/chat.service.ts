import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SecurityService } from "./security.service";
import { Observable } from "rxjs";
import { Chat } from "../models/chat.model";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private token = "";

  constructor(
    private http: HttpClient,
    private theSecurityService: SecurityService
  ) {
    let sessionData = this.theSecurityService.getSessionData();
    if (sessionData) {
      let sessionObject = JSON.parse(sessionData);
      this.token = sessionObject.token;
    }
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
  }

  list(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.url_ms_negocio}/chats`, {
      headers: this.getHeaders(),
    });
  }
  view(id: number): Observable<Chat> {
    return this.http.get<Chat>(`${environment.url_ms_negocio}/chats/${id}`, {
      headers: this.getHeaders(),
    });
  }
  create(theChat: Chat): Observable<Chat> {
    return this.http.post<Chat>(
      `${environment.url_ms_negocio}/chats/`,
      theChat,
      { headers: this.getHeaders() }
    );
  }
  update(theChat: Chat): Observable<Chat> {
    return this.http.put<Chat>(
      `${environment.url_ms_negocio}/chats/${theChat.id}`,
      theChat,
      { headers: this.getHeaders() }
    );
  }

  delete(id: number) {
    return this.http.delete<Chat>(`${environment.url_ms_negocio}/chats/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
