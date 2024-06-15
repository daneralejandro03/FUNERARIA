import { Injectable } from "@angular/core";
import { Deceased } from "../models/deceased.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cause } from "../models/cause.model";

@Injectable({
  providedIn: "root",
})
export class DeceasedService {
  constructor(private http: HttpClient) {}

  list(): Observable<Deceased[]> {
    return this.http.get<Deceased[]>(
      `${environment.url_sustentación}/difuntos`
    );
  }

  create(theService: Deceased): Observable<Deceased> {
    return this.http.post<Deceased>(
      `${environment.url_sustentación}/difuntos/`,
      theService
    );
  }

  listCause(): Observable<Cause[]> {
    return this.http.get<Cause[]>(
      `${environment.url_sustentación}/causa-fallecimiento`
    );
  }
}
