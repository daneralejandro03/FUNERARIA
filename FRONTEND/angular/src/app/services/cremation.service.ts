import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cremation } from "../models/cremation.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CremationService {
  constructor(private http: HttpClient) {}

  list(): Observable<Cremation[]> {
    return this.http.get<Cremation[]>(
      `${environment.url_ms_negocio}/cremations`
    );
  }

  view(id: number): Observable<Cremation> {
    return this.http.get<Cremation>(
      `${environment.url_ms_negocio}/cremations/${id}`
    );
  }

  create(theService: Cremation): Observable<Cremation> {
    return this.http.post<Cremation>(
      `${environment.url_ms_negocio}/cremations/`,
      theService
    );
  }
  update(theService: Cremation): Observable<Cremation> {
    return this.http.put<Cremation>(
      `${environment.url_ms_negocio}/cremations/${theService.id}`,
      theService
    );
  }

  delete(id: number) {
    return this.http.delete<Cremation>(
      `${environment.url_ms_negocio}/cremations/${id}`
    );
  }
}
