import { Component, OnInit } from '@angular/core';
import { WorksService } from '../../work.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit {
  works: any[] = [];
  newWork = { title: '', description: '', image: null };
  // Loading spinner Animation
  isLoading = true; // Loading indicator

  constructor(private worksService: WorksService) {}

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks() {
    this.worksService.getWorks().subscribe((data) => {
      this.works = data;
      this.isLoading = false; // Stop loading spinner
    }, (error) => {
      console.error("Error loading Works Data. " + error.message);
      this.isLoading = false; // Stop loading spinner
    });
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
