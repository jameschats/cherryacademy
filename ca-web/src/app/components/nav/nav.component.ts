import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true, // Mark this component as standalone
  imports: [RouterModule] // Import RouterModule to use routerLink
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Logout() {
    // Perform any logout operations here
    console.log('Logout clicked');
    
    // For example, clear user session or token
    localStorage.setItem('token',''); // Clear local storage (if storing tokens)

    // Optionally navigate to the login page    
    this.router.navigate(['/login']);
  }
}
