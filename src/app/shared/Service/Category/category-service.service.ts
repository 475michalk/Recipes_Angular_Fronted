import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private apiUrl = 'http://localhost:5000/category'; // Update the URL as needed

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}`);
  }

  addCategory(categoryName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { name: categoryName });
  }
}

