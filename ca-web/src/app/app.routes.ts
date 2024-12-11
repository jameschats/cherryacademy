import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { StudentsComponent } from './components/students/students.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';

//export const routes: Routes = [];
export const routes: Routes = [
    { path: '', component: LoginComponent }, // Default route
    { path: 'home', component: HomeComponent }, // Default route
    { path: 'students', component: StudentsComponent }, // Default route
    { path: 'aboutus', component: AboutusComponent }, // Default route
    { path: 'register', component: RegisterComponent }, // Default route
    { path: '**', redirectTo: '' }, // Redirect invalid routes to default
  ];