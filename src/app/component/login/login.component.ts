import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../shared/Service/Users/user-service.service';
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


errorMessage: string | null = null;
email: string = '';
password: string = '';

private userService=inject(UserServiceService);
private router=inject(Router);


login(email: string, password: string) {
  this.userService.login({ email, password }).subscribe(
    (data) => {
      console.log(data);
      this.userService.token = data.token;
      this.router.navigate(['/allRecipes']);
    },
    (error) => {
      console.error('Login failed', error);
      this.errorMessage = 'Login failed: Invalid email or password';
    }
  );
}


}

