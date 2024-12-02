import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  aboutData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/about').subscribe((data) => {
      this.aboutData = data;
    });
  }
}
