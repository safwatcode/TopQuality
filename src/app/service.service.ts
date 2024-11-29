import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Service {
  _id?: string;
  title: string;
  description: string;
  image: string;
}
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/api/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  createService(serviceData: FormData): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, serviceData);
  }

  updateService(id: string, serviceData: FormData): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/${id}`, serviceData);
  }

  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
