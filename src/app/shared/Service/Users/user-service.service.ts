import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Users } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private http = inject(HttpClient);
  private usersURL = `${environment.apiURL}/user`;

  currentUser?: Users;

  public get token(): string | null {
    return localStorage.getItem('mytoken');
  }

  public set token(token: string | null) {
    if (token) {
      localStorage.setItem('mytoken', token);
    }
  }

  login(u: { email: string, password: string }) {
    return this.http.post<{ user: Users; token: string }>(
      `${this.usersURL}/signIn`,
      u
    );
  }
  signUp(u: Users) {
    return this.http.post<{ user: Users; token: string }>(
      `${this.usersURL}/signUp`,
      u
    );
  }

}