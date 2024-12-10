import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  standalone: true,
  imports: [NavComponent] // Import the NavComponent
})
export class StudentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
