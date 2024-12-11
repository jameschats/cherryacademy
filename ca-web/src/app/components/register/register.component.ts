import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule, RouterModule], // Import FormsModule here
})


export class RegisterComponent implements OnInit {

  constructor(private authservices: AuthService) { }

  
  ngOnInit() {
  }

  password: string = '';
  
  onSubmit(form: any) {
    if (form.valid) {
      this.authservices.register(form.value).subscribe({
        next: (value: any) => {
          localStorage.setItem('token', value.accessToken);       
          console.log(value);
          console.log('Form Submitted', form.value);      
          alert('Registration Successful!');
          form.resetForm(); // Reset validation states
       
        },
        error: (error: any) => {
        //  this.toaster.error(error.error)
          console.error('Registration error', error);
          alert('User already exists');
  
        }
      })
     
    } else {
      alert('Please fill all fields correctly!');
    }
  }

}


