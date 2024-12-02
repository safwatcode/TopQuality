import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };

    this.http
      .post('http://localhost:3000/api/auth/login', credentials)
      .subscribe({
        next: (res: any) => {
          // Save admin username in session storage (or token for better security)
          sessionStorage.setItem('admin', res.username);
          this.router.navigate(['/admin']); // Redirect to admin page that contains dashboard
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please try again.';
        },
      });
  }

  getAdminName(): string {
    return this.username;
  }
}
