import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  standalone: true,
  imports: [NavComponent,RouterModule] // Import the NavComponent
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
