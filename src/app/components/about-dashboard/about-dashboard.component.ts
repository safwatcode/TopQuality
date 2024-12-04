import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AboutService } from '../../about.service';

@Component({
  selector: 'app-about-dashboard',
  templateUrl: './about-dashboard.component.html',
  styleUrls: ['./about-dashboard.component.css'],
})
export class AboutDashboardComponent implements OnInit {
  timeline: any[] = [];
  teamMembers: any[] = [];
  companyValues: any[] = [];

  newTimelineEntry: any = {};
  newTeamMember: any = {};
  newCompanyValue: any = {};
  selectedFile: File | null = null;

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.loadTimeline();
    this.loadTeamMembers();
    this.loadCompanyValues();
  }

  // Timeline Methods
  loadTimeline() {
    this.aboutService.getTimeline().subscribe((data: any[]) => (this.timeline = data));
  }

  addTimelineEntry() {
    this.aboutService
      .createTimelineEntry(this.newTimelineEntry)
      .subscribe((response: any) => {
        this.timeline.push(response);
        this.newTimelineEntry = {};
      });
  }

  deleteTimelineEntry(id: string) {
    this.aboutService.deleteTimelineEntry(id).subscribe(() => {
      this.timeline = this.timeline.filter((entry) => entry._id !== id);
    });
  }

  // Team Member Methods
  loadTeamMembers() {
    this.aboutService.getTeamMembers().subscribe(
      (data: any[]) => {
        this.teamMembers = data;
      },
      (error: any) => {
        console.error('Error loading Services:', error);
      }
    );
  }

  /* As refrence for me
 loadServices() {
    this.servicesService.getServices().subscribe(
      (data) => {
        this.services = data;
        this.isLoading = false; // Stop loading spinner
      },
      (error) => {
        console.error('Error loading Services:', error);
        this.isLoading = false; // Stop loading spinner
      }
    );
  }

  */

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addTeamMember() {
    const formData = new FormData();
    formData.append('name', this.newTeamMember.name);
    formData.append('role', this.newTeamMember.role);
    formData.append('category', this.newTeamMember.category);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.aboutService.createTeamMember(formData).subscribe((response: any) => {
      this.teamMembers.push(response);
      this.newTeamMember = {};
      this.selectedFile = null;
    });
  }

  deleteTeamMember(id: string) {
    this.aboutService.deleteTeamMember(id).subscribe(() => {
      this.teamMembers = this.teamMembers.filter((member) => member._id !== id);
    });
  }

  // Company Values Methods
  loadCompanyValues() {
    this.aboutService
      .getCompanyValues()
      .subscribe((data: any[]) => (this.companyValues = data));
  }

  addCompanyValue() {
    this.aboutService
      .createCompanyValue(this.newCompanyValue)
      .subscribe((response: any) => {
        this.companyValues.push(response);
        this.newCompanyValue = {};
      });
  }

  deleteCompanyValue(id: string) {
    this.aboutService.deleteCompanyValue(id).subscribe(() => {
      this.companyValues = this.companyValues.filter(
        (value) => value._id !== id
      );
    });
  }
}
