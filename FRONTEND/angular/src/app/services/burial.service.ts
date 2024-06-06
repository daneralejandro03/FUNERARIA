import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Burial } from "../models/burial.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BurialService {
  constructor(private http: HttpClient) {}

  list(): Observable<Burial[]> {
    return this.http.get<Burial[]>(`${environment.url_ms_negocio}/burials`);
  }

  view(id: number): Observable<Burial> {
    return this.http.get<Burial>(`${environment.url_ms_negocio}/burials/${id}`);
  }

  create(theService: Burial): Observable<Burial> {
    return this.http.post<Burial>(
      `${environment.url_ms_negocio}/burials/`,
      theService
    );
  }
  update(theService: Burial): Observable<Burial> {
    return this.http.put<Burial>(
      `${environment.url_ms_negocio}/burials/${theService.id}`,
      theService
    );
  }

  delete(id: number) {
    return this.http.delete<Burial>(
      `${environment.url_ms_negocio}/burials/${id}`
    );
  }
}
