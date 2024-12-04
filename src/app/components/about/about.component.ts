import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AboutService } from '../../about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  timeline: any[] = [];
  teamMembers: any[] = [];
  companyValues: any[] = [];

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.loadTimeline();
    this.loadTeamMembers();
    this.loadCompanyValues();
  }

  loadTimeline() {
    this.aboutService
      .getTimeline()
      .subscribe((data: any[]) => (this.timeline = data));
  }

  loadTeamMembers() {
    this.aboutService
      .getTeamMembers()
      .subscribe((data: any[]) => (this.teamMembers = data));
  }

  loadCompanyValues() {
    this.aboutService
      .getCompanyValues()
      .subscribe((data: any[]) => (this.companyValues = data));
  }
}

// Custom pipe for filtering team members
@Pipe({
  name: 'filterTeam',
})
export class FilterTeamPipe implements PipeTransform {
  transform(members: any[], categories: string): any[] {
    if (!members || !categories) return members;
    const categoryList = categories.split(',').map((cat) => cat.trim());
    return members.filter((member) => categoryList.includes(member.category));
  }
}
