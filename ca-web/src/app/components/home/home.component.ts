import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule,  RouterModule, NavComponent  ], // Import FormsModule here  
})
export class HomeComponent {
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
}
