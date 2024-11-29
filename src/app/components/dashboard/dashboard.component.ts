import { Component, OnInit } from '@angular/core';
import { WorksService } from '../../work.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  works: any[] = [];
  newWork = { title: '', description: '', image: null };

  constructor(private worksService: WorksService) {}

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks() {
    this.worksService.getWorks().subscribe((data) => (this.works = data));
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newWork.image = file;
    } else {
      this.newWork.image = null;
    }
  }

  addWork() {
    const formData = new FormData();

    formData.append('title', this.newWork.title);
    formData.append('description', this.newWork.description);

    if (this.newWork.image) {
      formData.append('image', this.newWork.image);
    } else {
      alert('Please select an image!');
      return;
    }

    this.worksService.createWork(formData).subscribe({
      next: (response) => {
        console.log('Work added:', response.title);
        this.loadWorks();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating work:', err.message);
        alert('Failed to create work. Please try again.');
      },
    });
  }
  resetForm() {
    this.newWork = { title: '', description: '', image: null };
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  deleteWork(id: string) {
    this.worksService.deleteWork(id).subscribe(() => this.loadWorks());
  }
}
