import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule, RouterModule,HttpClientModule], // Import FormsModule here
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
          //this.router.navigate(['/signup-success']);
  
          console.log(value);
          console.log('Form Submitted', form.value);      
          alert('Registration Successful!');
          form.reset();
        },
        error: (error: any) => {
        //  this.toaster.error(error.error)
          console.error('Login error', error);
  
        }
      })
     
    } else {
      alert('Please fill all fields correctly!');
    }
  }

  // Signup() {
  //   if (!this.signupform.valid)
  //     return;
  //   this.authservices.register(this.signupform.value).subscribe({
  //     next: (value: any) => {
  //       localStorage.setItem('token', value.accessToken);
  //       //this.router.navigate(['/signup-success']);

  //       console.log(value);
  //     },
  //     error: (error: any) => {
  //      // this.toaster.error(error.error)
  //       console.error('Login error', error);

  //     }
  //   })
  // }
}


