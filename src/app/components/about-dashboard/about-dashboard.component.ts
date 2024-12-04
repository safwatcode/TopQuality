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

  editItem: any = {};
  isEditingTimeline = false;
  isEditingTeamMember = false;
  isEditingCompanyValue = false;
member: any;

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.loadTimeline();
    this.loadTeamMembers();
    this.loadCompanyValues();
  }

  // Timeline Methods
  loadTimeline() {
    this.aboutService
      .getTimeline()
      .subscribe((data: any[]) => (this.timeline = data));
  }

  addTimelineEntry() {
    this.aboutService
      .createTimelineEntry(this.newTimelineEntry)
      .subscribe((response: any) => {
        this.timeline.push(response);
        this.newTimelineEntry = {};
      });
  }
  // Edit Timeline Entry
  editTimelineEntry(entry: any) {
    entry.isEditing = true; // Show input fields
  }

  // Save the edited Timeline Entry
  saveTimelineEntry(entry: any) {
    this.aboutService.updateTimelineEntry(entry._id, entry).subscribe(response => {
      entry.isEditing = false; // Hide input fields after saving
      this.loadTimeline(); // Refresh timeline data
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
  onFileSelected(event: any, member: any) {
    const file = event.target.files[0];
    if (file) {
      member.image = file; // Store the selected file to the member object
    }
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

  // Edit Team Member
  editTeamMember(member: any) {
    member.isEditing = true; // Show input fields
  }

  // Save the edited Team Member
  saveTeamMember(member: any) {
    // If an image is selected, include it in the update
    const formData = new FormData();
    if (member.image instanceof File) {
      formData.append('image', member.image);
    }
    formData.append('name', member.name);
    formData.append('role', member.role);
    formData.append('category', member.category);

    this.aboutService.updateTeamMember(member._id, formData).subscribe(response => {
      member.isEditing = false; // Hide input fields after saving
      this.loadTeamMembers(); // Refresh team members data
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
  // Edit Company Value
  editCompanyValue(value: any) {
    value.isEditing = true; // Show input fields
  }

  // Save the edited Company Value
  saveCompanyValue(value: any) {
    this.aboutService.updateCompanyValue(value._id, value).subscribe(response => {
      value.isEditing = false; // Hide input fields after saving
      this.loadCompanyValues(); // Refresh company values data
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
