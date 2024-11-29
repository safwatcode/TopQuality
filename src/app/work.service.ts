import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Work {
  _id?: string;
  title: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class WorksService {
  private apiUrl = 'http://localhost:3000/api/works';

  constructor(private http: HttpClient) {}

  getWorks(): Observable<Work[]> {
    return this.http.get<Work[]>(this.apiUrl);
  }

  createWork(data: FormData): Observable<Work> {
    return this.http.post<Work>(this.apiUrl, data);
  }

  updateWork(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  deleteWork(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
