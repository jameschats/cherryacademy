import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule], // Import FormsModule here
})
export class LoginComponent {
  courses = [
    {
      name: 'Web Development Bootcamp',
      duration: '3 Months',
      description: 'Learn HTML, CSS, JavaScript, and Angular from scratch.'
    },
    {
      name: 'Data Science with Python',
      duration: '6 Months',
      description: 'Master Python, Pandas, NumPy, and Machine Learning.'
    },
    {
      name: 'Cloud Computing Essentials',
      duration: '2 Months',
      description: 'Understand cloud platforms like AWS and Azure.'
    }
  ];
  email: string = '';
  password: string = '';
  
  constructor(private router: Router) {}

  login() {
    // Add validation or authentication logic here
    if (this.email && this.password) {
      // Navigate to the HomeComponent route
      this.router.navigate(['/home']);
    } else {
      alert('Please enter your email and password');
    }
  }
}


// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
