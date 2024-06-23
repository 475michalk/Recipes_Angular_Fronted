import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../shared/Service/Users/user-service.service';
import { Users } from '../../shared/models/users';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

 
  private userService=inject(UserServiceService);
  private router=inject(Router);


  signUp(nameUser: string, email: string, password: string, address: string): void {

    this.userService.signUp({nameUser,email,password,address}).subscribe(
      (response) => {

        console.log('Registration Successful', response);
        this.userService.token = response.token;
        this.router.navigate(['/allRecipes']); 
      },
      (error) => {
        // Handle any errors
        console.error('Registration Failed', error);
      }
    );
}
}
