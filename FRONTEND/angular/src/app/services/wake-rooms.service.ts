import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WakeRoom } from "../models/wake-room.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WakeRoomsService {
  constructor(private http: HttpClient) {}

  list(): Observable<WakeRoom[]> {
    return this.http.get<WakeRoom[]>(`${environment.url_ms_negocio}/wakerooms`);
  }

  view(id: number): Observable<WakeRoom> {
    return this.http.get<WakeRoom>(
      `${environment.url_ms_negocio}/wakerooms/${id}`
    );
  }

  create(theService: WakeRoom): Observable<WakeRoom> {
    return this.http.post<WakeRoom>(
      `${environment.url_ms_negocio}/wakerooms/`,
      theService
    );
  }
  update(theService: WakeRoom): Observable<WakeRoom> {
    return this.http.put<WakeRoom>(
      `${environment.url_ms_negocio}/wakerooms/${theService.id}`,
      theService
    );
  }

  delete(id: number) {
    return this.http.delete<WakeRoom>(
      `${environment.url_ms_negocio}/wakerooms/${id}`
    );
  }
}
