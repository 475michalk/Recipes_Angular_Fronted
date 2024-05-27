import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserServiceService } from '../../shared/Service/Users/user-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private userService = inject(UserServiceService);

  signUp(nameUser: string, email: string, password: string, address: string, role: string) {
    const newUser = { nameUser, email, password, address, role };
    console.log('Signup Data:', newUser);

    this.userService.signUp(newUser).subscribe(
      (data) => {
        console.log('Registration Successful', data);
        this.userService.token = data.token;
        // הכוונת המשתמש לאחר ההרשמה המוצלחת, לדוגמה:
        // this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration Failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
}
