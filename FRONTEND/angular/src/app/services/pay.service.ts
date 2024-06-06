import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Pay } from "../models/pay.model";

@Injectable({
  providedIn: "root",
})
export class PayService {
  constructor(private http: HttpClient) {}

  // Obtener todos los pagos
  list(): Observable<Pay[]> {
    return this.http.get<Pay[]>(`${environment.url_ms_pago}/index`);
  }

  // Obtener un pago por ID
  view(id: number): Observable<Pay> {
    return this.http.get<Pay>(`${environment.url_ms_pago}/show/${id}`);
  }

  // Actualizar un pago por ID
  update(theService: Pay): Observable<Pay> {
    return this.http.put<Pay>(
      `${environment.url_ms_pago}/update/${theService.id}`,
      theService
    );
  }

  // Eliminar un pago por ID
  delete(id: number): Observable<Pay> {
    return this.http.delete<Pay>(`${environment.url_ms_pago}/destroy/${id}`);
  }

  // Pago por tarjeta de crédito
  directPaymentCreditcard(theService: Pay): Observable<Pay> {
    return this.http.post<Pay>(
      `${environment.url_ms_pago}/directPaymentCreditcard`,
      theService
    );
  }

  // Pago por Daviplata
  directPaymentDaviplata(theService: Pay): Observable<Pay> {
    return this.http.post<Pay>(
      `${environment.url_ms_pago}/directPaymentDaviplata`,
      theService
    );
  }

  // Pago por PSE
  directPaymentPSE(theService: Pay): Observable<Pay> {
    return this.http.post<Pay>(
      `${environment.url_ms_pago}/directPaymentPSE`,
      theService
    );
  }
}
