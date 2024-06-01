import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Site } from "../models/site.model";

@Injectable({
  providedIn: "root",
})
export class SiteService {
  constructor(private http: HttpClient) {}

  list(): Observable<Site[]> {
    return this.http.get<Site[]>(`${environment.url_ms_negocio}/sites`);
  }

  view(id: number): Observable<Site> {
    return this.http.get<Site>(`${environment.url_ms_negocio}/sites/${id}`);
  }

  create(theService: Site): Observable<Site> {
    return this.http.post<Site>(
      `${environment.url_ms_negocio}/sites/`,
      theService
    );
  }
  update(theService: Site): Observable<Site> {
    return this.http.put<Site>(
      `${environment.url_ms_negocio}/sites/${theService.id}`,
      theService
    );
  }

  delete(id: number) {
    return this.http.delete<Site>(`${environment.url_ms_negocio}/sites/${id}`);
  }
}
