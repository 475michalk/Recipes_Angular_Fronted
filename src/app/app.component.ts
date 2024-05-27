import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UserServiceService } from './shared/Service/Users/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,RouterOutlet,LoginComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Fronted';
  userService = inject(UserServiceService);
  constructor(private router: Router) {}

  isAllRecipesPage() {
    return this.router.url === '/allRecipes';
  }
}
