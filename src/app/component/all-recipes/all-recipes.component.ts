import { Component, Input, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { Recipes } from '../../shared/models/recipes';
import { RecipeServiceService } from '../../shared/Service/Recipe/recipe-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [MatTabsModule,CommonModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit{
  recipes: any[] = [];

  constructor(private recipeService: RecipeServiceService) { }

  ngOnInit(): void {
    // קריאה לשירות על מנת לקבל את רשימת המתכונים
    this.recipeService.getRecipes().subscribe((data: any) => {
      this.recipes = data;
      console.log(this.recipes);
      
    });
  }
}
