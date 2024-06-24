import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../shared/Service/Users/user-service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage: string | null = null;
  email: string = '';
  password: string = '';

  constructor(private userService: UserServiceService, private router: Router) {}
  
  ngOnInit(): void {
    // קבלת הערכים שנשלחו דרך ה- queryParams במקרה של חזרה מדף ההרשמה
    this.router.routerState.root.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.password = params['password'] || '';
    });
  }

  login(): void {
    this.userService.login({ email: this.email, password: this.password }).subscribe(
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

  ngOnDestroy(): void {
    console.log(this.email);
    console.log(this.password);
  }

  navigateToSignup(): void {
    this.router.navigate(['/register'], { queryParams: { email: this.email, password: this.password } });
  }
} 