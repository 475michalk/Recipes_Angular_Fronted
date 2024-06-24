import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../shared/Service/Users/user-service.service';
import { Users } from '../../shared/models/users';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  nameUser: string = '';
  email: string = '';
  password: string = '';
  address: string = '';

  constructor(private userService: UserServiceService, private router: Router, private route: ActivatedRoute) {}

  signUp(): void {
    this.userService.signUp({ nameUser: this.nameUser, email: this.email, password: this.password, address: this.address }).subscribe(
      (response) => {
        console.log('Registration Successful', response);
        this.userService.token = response.token;
        this.router.navigate(['/allRecipes']);
      },
      (error) => {
        console.error('Registration Failed', error);
      }
    );
  }

  ngOnInit(): void {
    // Retrieve email and password from query params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.password = params['password'] || '';
    });
  }
}