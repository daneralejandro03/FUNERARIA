import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SecurityService } from "./security.service";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
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

  list(): Observable<User[]> {
    console.log(this.token);
    return this.http.get<User[]>(`${environment.url_ms_security}/api/users`, {
      headers: this.getHeaders(),
    });
  }
  view(id: string): Observable<User> {
    return this.http.get<User>(
      `${environment.url_ms_security}/api/users/${id}`,
      { headers: this.getHeaders() }
    );
  }
  create(theUser: User): Observable<User> {
    return this.http.post<User>(
      `${environment.url_ms_security}/api/users`,
      theUser,
      { headers: this.getHeaders() }
    );
  }
  update(theUser: User): Observable<User> {
    return this.http.put<User>(
      `${environment.url_ms_security}/api/users/${theUser._id}`,
      theUser,
      { headers: this.getHeaders() }
    );
  }

  delete(id: string) {
    return this.http.delete<User>(
      `${environment.url_ms_security}/api/users/${id}`,
      { headers: this.getHeaders() }
    );
  }

  matchRole(userId: string, roleId: string): Observable<User> {
    return this.http.put<User>(
      `${environment.url_ms_security}/api/users/${userId}/role/${roleId}`,
      {},
      {
        headers: this.getHeaders(),
      }
    );
  }

  unmatchRole(userId: string, roleId: string): Observable<User> {
    return this.http.put<User>(
      `${environment.url_ms_security}/api/users/${userId}/unmatch-role/${roleId}`,
      {},
      {
        headers: this.getHeaders(),
      }
    );
  }
}
