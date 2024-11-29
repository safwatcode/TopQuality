import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../../service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-services-dashboard',
  templateUrl: './services-dashboard.component.html',
  styleUrls: ['./services-dashboard.component.css'],
})
export class ServicesDashboardComponent implements OnInit {
  services: any[] = [];
  newService = { title: '', description: '', image: null };
  selectedService: any = {};
  selectedImage: File | null = null;

  constructor(private servicesService: ServiceService) {}
  // Loading spinner Animation
  isLoading = true; // Loading indicator

  ngOnInit(): void {
    this.loadServices();
  }

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

  openEditModal(service: any): void {
    this.selectedService = { ...service };
    this.selectedImage = null;

    const modalElement = document.getElementById('editServiceModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show(); // Show the modal
    } else {
      console.error('Modal element not found!');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newService.image = file;
      this.selectedImage = file;
    } else {
      this.newService.image = null;
    }
  }

  addService() {
    const formData = new FormData();
    formData.append('title', this.newService.title);
    formData.append('description', this.newService.description);
    if (this.newService.image) {
      formData.append('image', this.newService.image);
    } else {
      alert('Please fill all data!');
      return; // Prevent form submission if image is missing
    }

    this.servicesService.createService(formData).subscribe(
      (response) => {
        console.log('Service added:', response.title);
        this.loadServices();
        this.resetForm();
      },
      (error) => {
        console.error('Error creating service:', error.message);
        alert('Failed to create service. Please try again.');
      }
    );
  }

  updateService() {
    const formData = new FormData();
    formData.append('title', this.selectedService.title);
    formData.append('description', this.selectedService.description);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.servicesService
      .updateService(this.selectedService._id, formData)
      .subscribe(
        (updatedService) => {
          const modalElement = document.getElementById('editServiceModal');
          const modal = new bootstrap.Modal(modalElement!);
          modal.hide();

          const index = this.services.findIndex(
            (s) => s._id === updatedService._id
          );
          if (index !== -1) {
            this.services[index] = updatedService;
          }
        },
        (error) => {
          console.error('Error updating service:', error);
        }
      );
  }

  deleteService(id: string) {
    this.servicesService.deleteService(id).subscribe(() => {
      this.loadServices();
    });
  }

  resetForm() {
    this.newService = { title: '', description: '', image: null };
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
