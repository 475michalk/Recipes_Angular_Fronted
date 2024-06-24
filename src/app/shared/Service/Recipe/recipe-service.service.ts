import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, catchError } from 'rxjs';
import { Recipe } from '../../models/recipes';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RecipeServiceService {
  private apiUrl = `${environment.apiURL}/recipe`;

  private apiUrlGetAll = `${environment.apiURL}/recipe/allR`;

  private apiUrlImage = `${environment.apiURL}/recipe/images`; 

  // אני מניח שזה ה-URL לשרת ה-API שלך

  constructor(private http: HttpClient) { }

  getNextImage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nextImage`);
  }
  // פונקציה לקבלת רשימת כל המתכונים
  getRecipes(page: number, pageSize: number): Observable<Recipe[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Recipe[]>(this.apiUrlGetAll, { params });
  }

  getMyRecipes(userId: string): Observable<Recipe[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    console.log(url);
    
    return this.http.get<Recipe[]>(url);
  }

  // פונקציה להוספת מתכון חדש
  addRecipe(recipe: Recipe, files?: FileList): Observable<any> {
    const fd = new FormData();
  
    if (files) {
      for (let i = 0; i < files.length; i++) {
        fd.append('image', files[i], files[i].name);
      }
    }
  
    fd.append('nameRecipe', recipe.nameRecipe ?? '');
    fd.append('descriptionRecipe', recipe.descriptionRecipe ?? '');
    fd.append('categoryName', JSON.stringify(recipe.categoryName ?? []));
    fd.append('preparationTime', recipe.preparationTime?.toString() ?? '');
    fd.append('level', recipe.level?.toString() ?? '');
    fd.append('dateAdd', recipe.dateAdd ? recipe.dateAdd.toISOString() : '');
    fd.append('layers', JSON.stringify(recipe.layers ?? []));
    fd.append('instructionRecipe', recipe.instructionRecipe ?? '');
    fd.append('privateYesOrNo', recipe.privateYesOrNo?.toString() ?? '');
    fd.append('image', JSON.stringify(recipe.image ?? []));
  
    const token = localStorage.getItem('mytoken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.user_id;
      const userName = decodedToken.nameUser;
  
      const addedByUsersData = [{ userId: userId, name: userName }];
  
      // Append the 'addedByUsers' data to the FormData object
      fd.append('addedByUsers', JSON.stringify(addedByUsersData));
    }
  
    // For debugging, log the FormData object before sending
    console.log('FormData:', fd);
  
    return this.http.post<any>(this.apiUrl, fd, { headers })
    
  }
  

    // פונקציה לעדכון מתכון קיים
    updateRecipe(recipeId: string, updatedRecipe: Recipe): Observable < any > {
      const url = `${this.apiUrl}/${recipeId}`;
      return this.http.put<any>(url, updatedRecipe);
    }

    // פונקציה למחיקת מתכון
    deleteRecipe(recipeId: string): Observable < any > {
      const url = `${this.apiUrl}/${recipeId}`;
      return this.http.delete<any>(url);
    }
  }
