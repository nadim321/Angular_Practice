import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  constructor(private authService: AuthService , private router: Router ) {}

  logout() {
    this.authService.logout();
  }
  studentAdd(){
    this.router.navigate(['/student']);
  }

}
