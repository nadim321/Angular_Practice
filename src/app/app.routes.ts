import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { 
      path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) 
    },
    { 
      path: 'dashboard', 
      loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      canActivate: [AuthGuard]
    },
    { 
      path: 'student', 
      loadComponent: () => import('./student/student.component').then(m => m.StudentComponent),
      canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '/login' },
  ];
