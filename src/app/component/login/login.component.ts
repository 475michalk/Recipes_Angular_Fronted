import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../shared/Service/Users/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

private userService=inject(UserServiceService);
private router=inject(Router);

login(email: string, password: string) {
  this.userService.login({ email, password }).subscribe(
    (data) => {
      console.log(data);
      this.userService.token = data.token;
      this.router.navigate(['/allRecipes']);
  },
  (error)=>{
    console.error('login Faild',error);
    
  });
}

}

