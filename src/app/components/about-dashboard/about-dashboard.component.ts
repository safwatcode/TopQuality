import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about-dashboard',
  templateUrl: './about-dashboard.component.html',
  styleUrls: ['./about-dashboard.component.css']
})
export class AboutDashboardComponent implements OnInit {
  aboutData: any = {
    logo: '',
    heading: '',
    subheading: '',
    timeline: [],
    team: [],
    values: [],
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAboutData();
  }

  fetchAboutData() {
    this.http.get('/api/about').subscribe((data: any) => {
      this.aboutData = data;
    });
  }

  updateGeneralInfo() {
    this.http.put('/api/about', this.aboutData).subscribe(() => {
      alert('General information updated!');
    });
  }

  updateTimeline() {
    this.http.put('/api/about', this.aboutData).subscribe(() => {
      alert('Timeline updated!');
    });
  }

  addTimeline() {
    this.aboutData.timeline.push({ year: '', description: '' });
  }

  deleteTimeline(index: number) {
    this.aboutData.timeline.splice(index, 1);
  }

  updateTeam() {
    this.http.put('/api/about', this.aboutData).subscribe(() => {
      alert('Team updated!');
    });
  }

  addTeamMember() {
    this.aboutData.team.push({ name: '', role: '', image: '' });
  }

  deleteTeamMember(index: number) {
    this.aboutData.team.splice(index, 1);
  }

  updateValues() {
    this.http.put('/api/about', this.aboutData).subscribe(() => {
      alert('Values updated!');
    });
  }

  addValue() {
    this.aboutData.values.push({ title: '', description: '' });
  }

  deleteValue(index: number) {
    this.aboutData.values.splice(index, 1);
  }
}
