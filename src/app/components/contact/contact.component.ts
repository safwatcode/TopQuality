import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  username: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  contact(ContactForm: NgForm) {
    console.log(ContactForm.value);
    ContactForm.reset();
  }
}
