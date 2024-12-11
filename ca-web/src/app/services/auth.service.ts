import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";



@Injectable({
    providedIn: 'root'
  })
  
  export class AuthService {
    
  
    private apiUrl = environment.apiBaseUrl;
  
    constructor(private http: HttpClient,private router: Router) { }
  
    register(model: any) {
      return this.http.post(`${this.apiUrl}/Auth/register`, model);
    }
    login(model: any) {
      return this.http.post(`${this.apiUrl}/Auth/login`, model);
    }
    isAuthenticated(): boolean {
      // You can implement the logic for checking token here
      const token = localStorage.getItem('token');
      return !!token;  // Return true if token exists, false otherwise
    }
    getToken() {
      const token = localStorage.getItem('token');
      return token
    }
    logout()
    {
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    }
}    