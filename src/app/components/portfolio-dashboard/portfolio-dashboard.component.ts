import { Component, OnInit } from '@angular/core';
import { WorksService } from '../../work.service';

// Add the import statement for bootstrap (just in case it's not auto-recognized)
declare var bootstrap: any;

@Component({
  selector: 'app-portfolio-dashboard',
  templateUrl: './portfolio-dashboard.component.html',
  styleUrl: './portfolio-dashboard.component.css',
})
export class PortfolioDashboardComponent implements OnInit {
  works: any[] = [];
  newWork = { title: '', description: '', image: null };
  // For editing the prouduct
  selectedWork: any = {}; // Holds the selected work for editing
  selectedImage: File | null = null; // Holds the selected image for editing

  constructor(private worksService: WorksService) {}
  // Loading spinner Animation
  isLoading = true; // Loading indicator

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks() {
    this.worksService.getWorks().subscribe(
      (data) => {
        this.works = data;
        this.isLoading = false; // Stop loading spinner
      },
      (error) => {
        console.error('Error loading Works Data. ' + error.message);
        this.isLoading = false; // Stop loading spinner
      }
    );
  }

  openEditModal(work: any): void {
    this.selectedWork = { ...work }; // Make a copy of the selected work
    this.selectedImage = null; // Reset the selected image
    const modal = new bootstrap.Modal(
      document.getElementById('editWorkModal')!
    );
    modal.show();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newWork.image = file;
      this.selectedImage = file;
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
      alert('Please fill all data!');
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

  updateWork(): void {
    const formData = new FormData();
    formData.append('title', this.selectedWork.title);
    formData.append('description', this.selectedWork.description);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    // Call service to update work
    this.worksService.updateWork(this.selectedWork._id, formData).subscribe(
      (updatedWork) => {
        // Find and hide the modal
        const modalElement = document.getElementById('editWorkModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement!);
          modal.hide(); // Hide the modal after updating work
        } else {
          console.error('Modal element not found!');
        }
        // Update the work in the list
        const index = this.works.findIndex((w) => w._id === updatedWork._id);
        if (index !== -1) {
          this.works[index] = updatedWork;
        }
      },
      (error) => {
        console.error('Error updating work:', error.message);
      }
    );
  }

  deleteWork(id: string) {
    this.worksService.deleteWork(id).subscribe(() => this.loadWorks());
  }
}
