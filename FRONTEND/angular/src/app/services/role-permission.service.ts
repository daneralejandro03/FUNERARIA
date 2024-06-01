import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolePermission } from '../models/role-permission.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {
  private apiUrl = `${environment.url_ms_security}/role-permission`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.apiUrl}`);
  }

  findByRole(roleId: string): Observable<RolePermission[]> {
    return this.http.get<RolePermission[]>(`${this.apiUrl}/role/${roleId}`);
  }

  create(roleId: string, permissionId: string): Observable<RolePermission> {
    return this.http.post<RolePermission>(`${this.apiUrl}/role/${roleId}/permission/${permissionId}`, {});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}