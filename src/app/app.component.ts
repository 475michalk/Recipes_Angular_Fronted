import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UserServiceService } from './shared/Service/Users/user-service.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';
  userService = inject(UserServiceService);
  private tokenSubscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.tokenSubscription = this.userService.token$.subscribe(token => {
      // This will trigger change detection when token changes
    });
  }

  ngOnDestroy() {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

  isAllRecipesPage() {
    return this.router.url === '/allRecipes';
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }

  getButtonText(): string {
    return this.userService.token ? 'Log Out' : 'Sign In';
  }
}