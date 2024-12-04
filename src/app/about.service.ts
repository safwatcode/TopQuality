import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = 'http://localhost:3000/api/about'; // Ensure this is your backend API

  constructor(private http: HttpClient) {}

  // Timeline Methods
  getTimeline() {
    return this.http.get<any[]>(`${this.apiUrl}/timeline`);
  }

  createTimelineEntry(entry: any) {
    return this.http.post<any>(`${this.apiUrl}/timeline`, entry);
  }

  updateTimelineEntry(id: string, entry: any) {
    return this.http.put<any>(`${this.apiUrl}/timeline/${id}`, entry); // Update by ID
  }

  deleteTimelineEntry(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/timeline/${id}`);
  }

  // Team Member Methods
  getTeamMembers() {
    return this.http.get<any[]>(`${this.apiUrl}/team`);
  }

  createTeamMember(memberData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/team`, memberData); // POST for creating new team member
  }

  updateTeamMember(id: string, memberData: FormData) {
    return this.http.put<any>(`${this.apiUrl}/team/${id}`, memberData); // PUT for updating team member
  }

  deleteTeamMember(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/team/${id}`);
  }

  // Company Values Methods
  getCompanyValues() {
    return this.http.get<any[]>(`${this.apiUrl}/values`);
  }

  createCompanyValue(value: any) {
    return this.http.post<any>(`${this.apiUrl}/values`, value);
  }

  updateCompanyValue(id: string, value: any) {
    return this.http.put<any>(`${this.apiUrl}/values/${id}`, value); // Update by ID
  }

  deleteCompanyValue(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/values/${id}`);
  }
}
