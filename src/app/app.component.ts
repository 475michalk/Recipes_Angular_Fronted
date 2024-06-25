import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UserServiceService } from './shared/Service/Users/user-service.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, LoginComponent, CommonModule, HttpClientModule,NgIf,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Frontend';
  userName: string | null = null;
  private tokenSubscription: Subscription | null = null;
  isManager = false; // Flag to check if user is a manager

  constructor(private router: Router, public userService: UserServiceService) {}

  ngOnInit(): void {
    this.tokenSubscription = this.userService.token$.subscribe(token => {
      if (token) {
        const decodedToken: any = jwtDecode(token);
        this.userName = decodedToken.nameUser;
        this.isManager = decodedToken.role === 'Manager'; // Check if user is a Manager
      } else {
        this.userName = null;
        this.isManager = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  getButtonText(): string {
    return this.userService.token ? 'התנתקות' : 'התחברות';
  }
}