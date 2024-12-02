import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent{
  adminName: string = '';

  constructor(private router: Router,) {}

  logout() {
    sessionStorage.clear(); // Clear session storage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
