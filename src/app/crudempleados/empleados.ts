import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEmpleado(empleado: any): Observable<any> {
    return this.http.post(this.apiUrl, empleado);
  }

  updateEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, empleado);
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
