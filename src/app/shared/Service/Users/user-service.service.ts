import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Users } from '../../models/users';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  private http = inject(HttpClient);
  private usersURL = `${environment.apiURL}/user`;

  private _token = new BehaviorSubject<string | null>(this.getTokenFromLocalStorage());
  public token$ = this._token.asObservable();

  currentUser?: Users; // Ensure currentUser is of type Users | undefined

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('mytoken');
  }

  public get token(): string | null {
    return this._token.value;
  }

  public set token(token: string | null) {
    if (token) {
      localStorage.setItem('mytoken', token);
    } else {
      localStorage.removeItem('mytoken');
    }
    this._token.next(token);
  }

  login(u: { email: string, password: string }): Observable<{ user: Users; token: string }> {
    return this.http.post<{ user: Users; token: string }>(
      `${this.usersURL}/signIn`,
      u
    );
  }

  signUp(u: Users): Observable<{ user: Users; token: string }> {
    return this.http.post<{ user: Users; token: string }>(
      `${this.usersURL}/signUp`,
      u
    );
  }

  logout(): void {
    this.token = null;
  }

  getAllUserNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.usersURL}/getName`);
  }
}
