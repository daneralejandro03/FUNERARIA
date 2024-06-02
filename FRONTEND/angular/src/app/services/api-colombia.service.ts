import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiColombiaService {
  private baseUrl = `${environment.url_api_colombia}`;

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Department`);
  }

  getCitiesByDepartment(departmentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Department/${departmentId}/cities`);
  }
}
