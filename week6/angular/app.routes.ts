import { Routes } from '@angular/router';

// Angular HOL - Exercise 4: Routing & Navigation
// Define all application routes here.

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home.component').then(m => m.HomeComponent),
    title: 'Home | Employee Portal'
  },
  {
    path: 'employees',
    loadComponent: () => import('./employee.component').then(m => m.EmployeeListComponent),
    title: 'Employees | Employee Portal'
    // canActivate: [AuthGuard]   // Uncomment after implementing AuthGuard
  },
  {
    path: 'employees/:id',
    loadComponent: () => import('./employee-detail.component').then(m => m.EmployeeDetailComponent),
    title: 'Employee Detail'
  },
  { path: '**', redirectTo: '/home' }  // Wildcard route
];
