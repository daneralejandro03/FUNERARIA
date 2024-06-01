import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) { }

  list(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.url_ms_security}/permissions`);
  }

  view(id: string): Observable<Permission> {
    return this.http.get<Permission>(`${environment.url_ms_security}/permissions/${id}`);
  }

  create(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(`${environment.url_ms_security}/permissions`, permission);
  }

  update(id: string, permission: Permission): Observable<Permission> {
    return this.http.put<Permission>(`${environment.url_ms_security}/permissions/${id}`, permission);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_security}/permissions/${id}`);
  }
}
