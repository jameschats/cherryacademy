import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Users } from '../../models/user';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule,HttpClientModule], // Import FormsModule here
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

  constructor(private router: Router,private authservices: AuthService) {}
  
  login() {
    // Add validation or authentication logic here
    if (this.email && this.password) {
      // Navigate to the HomeComponent route
      let usermodel = ({} as Users)
      usermodel.email = this.email;
      usermodel.password = this.password;
      this.authservices.login(usermodel).subscribe({
        next: (value: any) => {
          localStorage.setItem('token', value.accessToken);
          this.router.navigate(['/home']);
          // this.syncLocalCartToServer();
          // this.route.queryParams.subscribe(params => {
          //   const returnUrl = params['returnUrl'] || '/';
          //   this.router.navigate([returnUrl]);            
          // });
  
          // this.router.navigate(['/']);
  
          console.log(value);
        },
        error: (error: any) => {
          //this.toaster.error(error.error)
          console.error('Login error', error);
  
        }
      })
   
    } else {
      alert('Please enter your email and password');
    }
  }

  register() {
    // Add validation or authentication logic here
    // if (this.email && this.password) {
    //   // Navigate to the HomeComponent route
      this.router.navigate(['/register']);
    // } else {
    //   alert('Please enter your email and password');
    // }
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
