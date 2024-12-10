import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true, // Mark this component as standalone
  imports: [RouterModule] // Import RouterModule to use routerLink
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
